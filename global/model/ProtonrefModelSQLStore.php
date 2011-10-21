<?php
class ProtonrefModelSQLStore extends ModelSQLStore{
	public $id="rel_id";	
	public $table="proton_relation";
	public $fields=array("rel_id","dataset_id","starttimemap","time_map","relation_type");
}
?>
