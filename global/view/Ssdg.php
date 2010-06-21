<?php
class SsdgView extends View{
	public function Index(){
		require("Ssdg.Index.php");
	}
	public function Test(){
		Header('Content-type: text/xml');
        $xml="<?xml version='1.0'  encoding='UTF-8'?>\n";
        $xml.="<results>";
        $xml.="<count>2</count>";
        $xml.="<result>";
        $xml.="<id>0</id>";
        $xml.="<lat>12.345</lat>";
        $xml.="<long>54.321</long>";
        $xml.="<alt>200</alt>";
        $xml.="<value>200</value>";
        $xml.="</result>";
		$xml.="<result>";
        $xml.="<id>0</id>";
        $xml.="<lat>14.345</lat>";
        $xml.="<long>54.321</long>";
        $xml.="<alt>500</alt>";
        $xml.="<value>600</value>";
        $xml.="</result>";
        $xml.="</results>";       
        echo $xml;
	}
}
?>
