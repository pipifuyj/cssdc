<?php
class RefreshController extends Controller{
public function Index(){
	$this->dropview();
	$this->createview();
	echo "update sucessful!";
}
public function dropview(){
	$sql="drop view obsv_record";
	$this->sql->execute($sql);
}
public function createview(){
	$store=$this->framework->getModel("Puredataset")->store();
	$datasets=$store->filter();
	$sql="create view obsv_record as ";
	foreach($datasets as $index=>$dataset){
		if($index==0){
			$sql.="select concat('".$dataset->dataset_id."_',record_id) as 'record_id', file_path,file_name,thumb_name,file_size,obsv_start_time,obsv_end_time,'".$dataset->dataset_id."' as 'dataset_id' from ".strtolower($dataset->dataset_id)."_rec";
		}else{
			$sql.=" union select concat('".$dataset->dataset_id."_',record_id) as 'record_id', file_path,file_name,thumb_name,file_size,obsv_start_time,obsv_end_time,'".$dataset->dataset_id."' as 'dataset_id' from ".strtolower($dataset->dataset_id)."_rec";
		}
	}
	$this->sql->execute($sql);
}
}
?>
