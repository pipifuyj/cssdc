<?php
class SsdgView extends View{
	public function Index(){
		require("Ssdg.Index.php");
	}
	public function XML(){
		header('Content-type: text/xml');
		echo file_get_contents('test.xml');
	}
}
?>
