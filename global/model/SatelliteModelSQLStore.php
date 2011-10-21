<?php
class SatelliteModelSQLStore extends ModelSQLStore{
	public $id="satellite_id";	
	public $table="obsv_platform_satellite_dic";
	public $fields=array("satellite_name","platform_shortname","group_owner","satellite_model","intro");
	public function getDic(){
		return $this->where();
	}
}
?>
