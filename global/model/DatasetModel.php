<?php
class DatasetModel extends Model{
	public $_store="ModelDBStore";
	public $fields=array("dataset_id","dsname","dspath","mtpath","docpath","protocol","ip","user","passwd","filename","filepath","size","starttime","endtime","area_id","area","element_id","element","equip_id","equip","platform_id","satellite","station","subject_id","subject");
}
?>
