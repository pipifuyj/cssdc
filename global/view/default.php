<?php
class defaultView extends View{
	public function Index(){
		if(isset($_REQUEST['userID'])) setcookie('user',$_REQUEST['userID']);
		require("default.Home.php");
	}
}
?>
