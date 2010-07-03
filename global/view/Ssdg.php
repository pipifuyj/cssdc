<?php
class SsdgView extends View{
	public function Index(){
		require("Ssdg.Index.php");
	}
	public function XML(){
		header('Content-type: text/xml');
		$cmd = 'zCCMC "year='.$_REQUEST["year"].'&month='.$_REQUEST["month"].'&day='.$_REQUEST['day'].'&day='.$_REQUEST['day'].'&time_type='.$_REQUEST['timetype'].'&coordinate_type='.$_REQUEST['coordinate'].'&height='.$_REQUEST['height'].'&data_type='.$_REQUEST['data'].'"';
		//echo $cmd;
		passthru($cmd);
		//echo file_get_contents('test20100701.xml');
		//echo file_get_contents('test.xml');
	}
}
?>
