<?php
class DatasetModelDBStore extends ModelDBStore{
	//primary keys for relative tables
	public $ids=array("dataset_id","record_id","ref_id","area_id","ref_id","element_id","ref_id","equip_id","ref_id","satellite_id","station_id","ref_id","subject_id");
	//tables names for relative tables and relationship
	public $tables=array(
		"dataset_gern_attr",
		array("obsv_record","obsv_record.dataset_id=dataset_gern_attr.dataset_id","inner","has"=>"MultiRecord"),
		array("dataset_obsv_area_ref","dataset_gern_attr.dataset_id=dataset_obsv_area_ref.dataset_id","left"),
		array("obsv_area_dic","dataset_obsv_area_ref.area_id=obsv_area_dic.area_id","left","has"=>"MultiArea"),
		array("dataset_obsv_element_ref","dataset_gern_attr.dataset_id=dataset_obsv_element_ref.dataset_id","left"),
		array("obsv_element_dic","dataset_obsv_element_ref.element_id=obsv_element_dic.element_id","left","has"=>"MultiElem"),
		array("dataset_obsv_equip_ref","dataset_gern_attr.dataset_id=dataset_obsv_equip_ref.dataset_id","left"),
		array("obsv_equip_dic","dataset_obsv_equip_ref.equip_id=obsv_equip_dic.equip_id","left"),
		array("dataset_obsv_platform_ref","dataset_gern_attr.dataset_id=dataset_obsv_platform_ref.dataset_id","left"),
		array("obsv_platform_satellite_dic","dataset_obsv_platform_ref.platform_id=obsv_platform_satellite_dic.platform_shortname","left"),
		array("obsv_platform_station_dic","dataset_obsv_platform_ref.platform_id=obsv_platform_station_dic.platform_shortname","left"),
		array("dataset_subject_category_ref","dataset_gern_attr.dataset_id=dataset_subject_category_ref.dataset_id","left"),
		array("subject_category_dic","subject_category_dic.subject_id=dataset_subject_category_ref.subject_id","left")
		);
	//retrieve which attributes  from relative tables
	public $Fields=array(
		array("dataset_id","dataset_name","dataset_path","metadata_path","doc_path","protocol","dataserver_ip","user","passwd"),
		array("file_name","file_path","file_size","obsv_start_time","obsv_end_time"),
		array("area_id"),
		array("area_name"),
		array("element_id"),
		array("element_name"),
		array("equip_id"),
		array("equip_name"),
		array("platform_id"),
		array("platform_shortname"),
		array("platform_shortname"),
		array("subject_id"),
		array("subject_name")
	);
}
?>
