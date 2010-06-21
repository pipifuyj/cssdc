<?php
class GmapView extends View{
	function Index(){
		header("Content-type: text/xml");
		echo $this->xml;
	} 
}
?>
