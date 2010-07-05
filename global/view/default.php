<?php
class defaultView extends View{
	public function Index(){
		if(isset($_REQUEST['userID'])) setcookie('user',$_REQUEST['userID']);
		else setcookie('user',"");
		require("default.Home.php");
	}
}
?>
