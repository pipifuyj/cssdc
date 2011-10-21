<?php
class ElemModelSQLStore extends ModelSQLStore{
	public $id="element_id";	
	public $fields=array("element_name","intro");
	public $table="obsv_element_dic";
	public function getDic(){
		return $this->where();
	}
}
?>
