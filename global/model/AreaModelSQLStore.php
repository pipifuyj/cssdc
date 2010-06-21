<?php
class AreaModelSQLStore extends ModelSQLStore{
	public $id="area_id";	
	public $fields=array("area_id","area_name","parent","intro");
	public $table="obsv_area_dic";
	public function getDic(){
		return $this->where();
	}
	public function toTree($records,&$vns,$str="",$id=0){
                foreach($records as $record){
                        if($record->id==$id){
                                $node=$record;
                        }elseif($record->get('parent')==$id){
                                $child[]=$record;
                        }
                }
                if($node){
                        $vns['name'][]=$node->name;
                        $vns['title'][]=$node->get('name');
                        $vns['id'][]=$node->id;
                        $vns['pid'][]=$node->parent;
                        $vns['intro'][]=$node->intro;
                }
                if($child)foreach($child as $record){
                        $this->toTree($records,$vns,"",$record->id);
                }
        }
	public function getTree(){
		$dic=$this->getDic();
		$this->toTree($dic,$tree);
		return $tree;
	}
	public function getIdByName($name){
		$records=$this->filter(array(array('name','=',$name)));
		if(count($records)==1) return $records[0]->id;
	}
	public function getChild($name){
		$dic=$this->getDic();
		$id=$this->getIdByName($name);
		$this->toTree($dic,$child,"",$id);
		return $child;
	}
	public function toPath($records,$id,&$path){
                foreach($records as $record){
                        if($record->id==$id){
                        	if($record->parent==$id) $path[]=$record->name;
				else{
					$path[]=$record->name;
					$this->toPath($records,$record->parent,$path);
				}
                        }
                }
	}
	public function getPath($name){
		$dic=$this->getDic();
		$id=$this->getIdByName($name);	
		$this->toPath($dic,$id,$path);
		if(count($path)>1) return implode(".",array_reverse($path));	
		else return $path[0];
	}
}
?>
