<?php
class SubjectModelSQLStore extends ModelSQLStore{
	public $id="subject_id";	
	public $table="subject_category_dic";
	public $fields=array("subject_name","parent");
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
                        $vns['id'][]=$node->id;
                        $vns['title'][]=$node->get('name');
                        $vns['pid'][]=$node->parent;
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
	public function getAllLeaf(){
		$dic=$this->getDic();
		foreach($dic as $record){
			$parents[]=$record->parent;
		}
		foreach($dic as $record){
			if(!in_array($record->id,$parents)){
				$leaf['id'][]=$record->id;
				$leaf['name'][]=$record->name;
			}
		}
		return $leaf;
	}
	public function travelLeaf($records,&$leaf,$id){
                foreach($records as $record){
                        if($record->id==$id){
                                $node=$record;
                        }elseif($record->get('parent')==$id){
                                $child[]=$record;
                        }
                }
                if(!$child){
					$leaf['id'][]=$node->id;
					$leaf['name'][]=$node->name;
                }
                if($child)foreach($child as $record){
                        $this->travelLeaf($records,$leaf,$record->id);
                }
		
	}
	public function getLeaf($id=0){
		$dic=$this->getDic();
		$this->travelLeaf($dic,$leaf,$id);
		return $leaf;
	}
}
?>
