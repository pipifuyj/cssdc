<?php
class ProtonrefModelSQLStore extends ModelSQLStore{
	public $id="rel_id";	
	public $table="proton_relation";
	public $fields=array("proton_event_id","dataset_id","time_map","relation_type");
}
?>
