<?php
require_once("ModelStore.php");
class ModelSQLStore extends ModelStore{
	public $sql;
	public $table;
	public $fields=array();
	public $where="true";
	public function construct(){
		if(!$this->sql)$this->sql=$this->model->framework->sql;
		if(!$this->table)$this->table=strtolower($this->model->id);
		foreach($this->fields as $index=>$mapping){
			$this->model->fields[$index]->mapping=$mapping;
		}
		$mappings=array();
		$formats=array();
		$sets=array();
		$fields=array();
		foreach($this->model->fields as $field){
			$mappings[]=$field->mapping;
			$formats[]="'%s'";
			$sets[]="`{$field->mapping}`='%s'";
			$fields[]="`{$field->mapping}` as `{$field->name}`";
		}
		$fields[]="`{$this->id}`";
		$this->_insert="insert into `{$this->table}` (`".implode("`,`",$mappings)."`)values(".implode(",",$formats).")";
		$this->_update="update `{$this->table}` set ".implode(",",$sets)." where `{$this->id}`='%s' limit 1";
		$this->_select_fields=implode(",",$fields);
		$this->_select_from="`{$this->table}`";
		$this->_select_where=$this->where;
		$this->_select="select %s from {$this->_select_from} where {$this->_select_where}";
		parent::construct();
	}
	public function add(&$record){
		$values=array();
		foreach($this->model->fields as $field){
			$values[]=$record->get($field->name);
		}
		$this->sql->query($this->_insert,$values);
		if($this->sql->affectedRows()==1){
			$record->id=$this->sql->insertId();
			return true;
		}else return false;
	}
	public function commit($record){
		$values=array();
		foreach($this->model->fields as $field){
			$values[]=$record->get($field->name);
		}
		$this->sql->query($this->_update,$values,$record->id);
		return $this->sql->affectedRows()==1;
	}
	public function remove($record){
		$this->sql->query("delete from `{$this->table}` where `{$this->id}`='%s' limit 1",$record->id);
		return $this->sql->affectedRows()==1;
	}
	public function filter($filters=array(),$start=0,$limit=0){
		return $this->where($this->parseFilters($filters),$this->parseSorts(),$start,$limit);
	}
	public function collect($key,$filters=array(),$start=0,$limit=0){
		$mapping=$this->mapping($key);
		$where=$this->parseFilters($filters);
		if($sort=$this->parseSorts())$sort="order by $sort";
		if($limit)$limit="limit $start, $limit";else $limit="";
		$this->sql->query("$this->_select and $where $sort $limit","distinct($mapping) as `$key`");
		$collect=array();
		while($row=$this->sql->getRow()){
			$collect[]=$row[$key];
		}
		return $collect;
	}
	public function getTotalCount($filters=array()){
		$where=$this->parseFilters($filters);
		$this->sql->query("$this->_select and $where","count(distinct(`{$this->table}`.`{$this->id}`)) as `TotalCount`");
		$row=$this->sql->getRow();
		$TotalCount=$row['TotalCount'];
		return $TotalCount;
	}
	public function mapping($key){
		$mapping=$this->model->field($key)->mapping;
		return "`$mapping`";
	}
	public function parseFilters($filters=array()){
		return $this->logic(ModelStore::logic($this->filters,$filters));
	}
	public function logic($filters){
		if(isset($filters['and']))$flag="and";
		elseif(isset($filters['or']))$flag="or";
		if($flag)return "(".$this->logic($filters[0]).") $flag (".$this->logic($filters[$flag]).")";
		foreach($filters as &$filter){
			if(isset($filter['and'])||isset($filter['or'])){
				$filter="(".$this->logic($filter).")";
				continue;
			}
			$mapping=$this->mapping($filter[0]);
			$count=count($filter);
			if($count==2){
				$f="like";
				$value=$filter[1];
				$filter="$mapping $f '$value'";
			}elseif($filter[1]=="in"){
				$f="in";
				$value="('".implode("','",$filter[2])."')";
				$filter="$mapping $f $value";
			}else{
				$f=$filter[1];
				$value=$filter[2];
				$filter="$mapping $f '$value'";
			}
		}
		$where=implode(" and ",$filters);
		if(!$where)$where="true";
		return $where;
	}
	public function parseSorts(){
		$order=array();
		foreach($this->sorts as $sort){
			$sort[0]=$this->mapping($sort[0]);
			$order[]=implode(" ",$sort);
		}
		$order=implode(",",$order);
		return $order;
	}
	public function where($where="",$order="",$start=0,$limit=0){
		if(!$where)$where="true";
		if($order)$order="order by $order";
		else $order="";
		if($limit)$limit="limit $start, $limit";
		else $limit="";
		$this->sql->query("$this->_select and $where $order $limit",$this->_select_fields);
		//echo $this->sql->lastClause;
		$records=array();
		while($row=$this->sql->getRow()){
			$records[]=$this->model->record($row,$row[$this->id]);
		}
		return $records;
	}
}
?>
