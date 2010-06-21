<?php
class ProtonModelSQLStore extends ModelSQLStore{
	public $id="proton_id";	
	public $table="proton_event";
	public $fields=array("nasa_start_time","nasa_max_time","proton_flux","associated_cme","flare_max_time","importance","region_location","region_number","esa_start_time","esa_end_time","esa_duration","history_img","spectrum_img","statistic_img","alias","remark");
}
?>
