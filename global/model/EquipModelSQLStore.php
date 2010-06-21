<?php
class EquipModelSQLStore extends ModelSQLStore{
	public $id="equip_id";	
	public $table="obsv_equip_dic";
	public $fields=array("equip_name","equip_alias","intro");
	public function getDic(){
		return $this->where();
	}
}
?>
