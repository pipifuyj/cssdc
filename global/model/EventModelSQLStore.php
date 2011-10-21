<?php
class EventModelSQLStore extends ModelSQLStore{
	public $id="event_id";	
	public $table="space_event";
	public $fields=array("event_name","intro");
}
?>
