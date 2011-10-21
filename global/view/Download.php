<?php
class DownloadView extends View{
	public function Index(){
		$url=$_REQUEST["url"];
		$name=$_REQUEST["name"];
		header('Content-Type: application/octet-stream');
		header('Content-Disposition: attachment; filename="'.$name.'"');
		header('Content-Transfer-Encoding: binary'); 
		readfile($url);
	}
}
?>
