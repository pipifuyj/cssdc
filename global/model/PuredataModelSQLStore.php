<?php
class PuredataModelSQLStore extends ModelSQLStore{
	public $id="record_id";	
	public $fields=array("record_id","file_path","file_name","thumb_name","file_size","obsv_start_time","obsv_end_time","dataset_id");
	public $table="obsv_record";
}
?>
