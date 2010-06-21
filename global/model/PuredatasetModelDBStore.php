<?php
class PuredatasetModelDBStore extends ModelDBStore{
	//primary keys for relative tables
	public $ids=array("dataset_id","ref_id","area_id","ref_id","element_id","ref_id","equip_id","ref_id","satellite_id","station_id","ref_id","subject_id","ref_id","node_id");
	public $tables=array(
		"dataset_gern_attr",
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
		array("subject_category_dic","subject_category_dic.subject_id=dataset_subject_category_ref.subject_id","left"),
		array("dataset_delivery_gridnode_ref","dataset_gern_attr.dataset_id=dataset_delivery_gridnode_ref.dataset_id","left"),
		array("grid_node_dic","grid_node_dic.node_id=dataset_delivery_gridnode_ref.node_id","left","has"=>"MultiNode")
	);
	public $Fields=array(
		array("dataset_id","dataset_name","data_num","dataset_path","metadata_path","doc_path","data_format","protocol","dataserver_ip","user","passwd"),
		array("area_id"),
		array("area_name"),
		array("element_id"),
		array("element_name"),
		array("equip_id"),
		array("equip_name","equip_alias"),
		array("platform_id"),
		array("platform_shortname","group_owner","satellite_model","satellite_name"),
		array("platform_shortname","group_owner","station_code","station_name"),
		array("subject_id"),
		array("subject_name"),
		array("node_id"),
		array("institution_name")
	);
}
?>
