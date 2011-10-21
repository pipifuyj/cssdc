<?php
abstract class sql{
	var $id;
	var $result;
	var $lastClause;
	function sql($server,$username="",$password="",$database=null,$charset=null){
		$this->id=$this->connect($server,$username,$password);
		$database&&$this->setDatabase($database);
		$charset&&$this->setCharset($charset);
	}
	function __destruct(){
		@$this->free($this->result);
		@$this->close();
	}
	abstract function affectedRows();
	abstract function close();
	abstract function connect($server,$username,$password);
	abstract function escapeString($string);
	abstract function execute($sql);//iconv
	abstract function fetchField($result);//iconv
	abstract function fetchRow($result);//iconv
	
	/**
	* function to retrieve the names of database.tables
	* @abstract
	* @access public
	* @param null|string $database the name of database
	* @return array the array will contain all the names of database.tables
	*/
	abstract function fetchAllTableNames($database=null);

	/**
	* function to retrieve the information of database.table.column
	* @abstract
	* @access public
	* @param string $table the name of database.table
	* @param string $column the name of database.table.column
	* @return array|bool if success the array will contain the keys: name, key, type, comment; or false. the name's value is the name of database.table.column, the key's value will be "PRI"|"UNI"|"MUL"|"", the type's value will be like varchar(100), the default's value will be the default value of the column defined by the table, the comment's value will be specified by the table or the program(maybe an encoded string using JSON format)
	*/
	abstract function fetchColumn($table,$column);
	
	/**
	* function to retrive the names of database.table.columns
	* @abstract
	* @access public
	* @param string $table the name of database.table
	* @return array the array will contain all the names of database.table.columns
	*/
	abstract function fetchAllColumnNames($table);
	
	abstract function free($result);
	abstract function insertId();
	abstract function numRows($result);
	abstract function numFields($result);
	abstract function setCharset($charset);
	abstract function setDatabase($database);
	function escapeArray($array){
		while(list($k,$v)=each($array)){
			$array[$k]=$this->escapeString($v);
		}
		return $array;
	}
	
	/**
	* @access public
	* @param the same to printf, and even more convenient: string, v, [v,..], ...
	* @return result of excute
	*/
	function executef(){
		$argv=func_get_args();
		$format=$argv[0];
		$array=array();
		for($i=1,$ii=func_num_args();$i<$ii;$i++){
			$arg=$argv[$i];
			if(is_array($arg))$array=array_merge($array,$arg);
			else $array[]=$arg;
		}
		$array=$this->escapeArray($array);
		$this->lastClause=call_user_func_array("sprintf",array_merge(array($format),$array));
		return $this->execute($this->lastClause);
	}
	function fetchAllFields($result){
		$return=array();
		while($field=$this->fetchField($result))$return[]=$field;
		return $return;
	}
	function fetchAllRows($result){
		$return=array();
		while($row=$this->fetchRow($result))$return[]=$row;
		return $return;
	}
	function getField(){
		return $this->fetchField($this->result);
	}
	function getAllFields(){
		return $this->fetchAllFields($this->result);
	}
	function getRow(){
		return $this->fetchRow($this->result);
	}
	function getAllRows(){
		return $this->fetchAllRows($this->result);
	}
	function getAllTableNames($database=null){
		return $this->fetchAllTableNames($database);
	}
	function getColumn($table,$column){
		return $this->fetchColumn($table,$column);
	}
	function getAllColumnNames($table){
		return $this->fetchAllColumnNames($table);
	}
	function getAllColumns($table){
		$columns=array();
		$names=$this->getAllColumnNames($table);
		while(list($k,$v)=each($names)){
			$columns[$v]=$this->getColumn($table,$v);
		}
		return $columns;
	}
	function getAllKeyNames($table,$type="PRI"){
		$names=array();
		$columns=$this->getAllColumns($table);
		while(list($k,$v)=each($columns)){
			if($v['key']==$type)$names[]=$v['name'];
		}
		return $names;
	}
	function getAllKeys($table,$type="PRI"){
		$keys=array();
		$columns=$this->getAllColumns($table);
		while(list($k,$v)=each($columns)){
			if($v['key']==$type)$keys[$v['name']]=$v;
		}
		return $keys;
	}	
	function query(){
		$argv=func_get_args();
		return $this->result=call_user_method_array("executef",$this,$argv);
	}
	function selectedRows(){
		return $this->numRows($this->result);
	}
	function selectedFields(){
		return $this->numFields($this->result);
	}
	
	/**
	* function to return html of the <input /> relative to the column
	* @access public
	* @param array $column defiend in fetchColumn
	* @param null||string $id the id of the input element
	* @param null||string $value the value of the input element
	* @return string html fragment: <input ... />
	*/
	function htmlColumnToInput($column,$id=null,$value=null){
		if(!$id)$id=$column['name'];
		if($value===null)$value=$column['default'];
		if(!preg_match("/^([a-z]*)\((.*)\)$/",$column['type'],$type))preg_match("/^([a-z]*)$/",$column['type'],$type);
		switch($type[1]){
			case "text":
			case "longtext":
				$html="<textarea id=\"$id\" name=\"$id\">$value</textarea>";
				break;
			case "enum":
				$options=$type[2];
				$options=str_replace("'","",$options);
				$options=explode(",",$options);
				$html="<select id=\"$id\" name=\"$id\">";
				while(list($k,$v)=each($options)){
					if($v==$value){
						$html.="<option value=\"$v\" selected>$v</option>";
					}else{
						$html.="<option value=\"$v\">$v</option>";
					}
				}
				$html.="</select>";
				break;
			case "set":
				$options=$type[2];
				$options=str_replace("'","",$options);
				$options=explode(",",$options);
				$html="<select id=\"".$id."[]\" name=\"".$id."[]\" multiple>";
				while(list($k,$v)=each($options)){
					if(strpos(",$value,",",".$v.",")===false){
						$html.="<option value=\"$v\">$v</option>";
					}else{
						$html.="<option value=\"$v\" selected>$v</option>";
					}
				}
				$html.="</select>";
				break;
			case "date":
				if($value=='0000-00-00'||!$value)$value=date("Y-m-d");
				$html="<input id=\"$id\" name=\"$id\" type=\"text\" value=\"$value\" />";
				break;
			case "datetime":
				if($value=='0000-00-00 00:00:00'||!$value)$value=date("Y-m-d H:i:s");
				$html="<input id=\"$id\" name=\"$id\" type=\"text\" value=\"$value\" />";
				break;
			case "timestamp":
				if($value=='CURRENT_TIMESTAMP'||!$value)$value=date("Y-m-d H:i:s");
				$html="<input id=\"$id\" name=\"$id\" type=\"text\" maxlength=\"".$type[2]."\" value=\"$value\" />";
				break;
			default:
				$value=str_replace('"','&#34;',$value);
				$html="<input id=\"$id\" name=\"$id\" type=\"text\" maxlength=\"".$type[2]."\" value=\"$value\" />";
				break;
		}
		return $html;
	}
}
?>
