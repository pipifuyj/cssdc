<?php
class VirtuallabController extends Controller{
	public function Index(){
	}
	public function Upload(){
		if ($_FILES["file"]["error"]>0){
    		echo '{success:false, msg:failed to upload "'.$_FILES['file']['name'].'"}';
		}else{
	    	$file=explode(".",$_FILES["file"]["name"]);
			$filename=rand();
        	$fileext=$file[1];
	    	if(move_uploaded_file($_FILES["file"]["tmp_name"], "upload/" . $filename . "." . $fileext)){
				$tooldir = "tool/translation/";
				$storedir = "upload/";
				switch($_POST['type']){
					case "cdf-fits":
						if($fileext=="cdf"){
							$cmd=$tooldir."cdf-to-fits-static ".$storedir.$filename.".fits ".$storedir.$filename.".".$fileext.";tar cvfz ".$storedir.$filename.".tar.gz ".$storedir.$filename.".".$fileext." ".$storedir.$filename.".fits";
							exec($cmd);
    						echo '{success:true, file:"'.$filename.'.tar.gz"}';
						}else{
							$msg="Not CDF Format";
    						echo '{success:false, msg:"'.$msg.'"}';
						}
						break;
					case "cdf-netCDF":
						if($fileext=="cdf"){
							$cmd="cd ".$storedir.";../".$tooldir."cdf-to-netCDF -map ../".$tooldir."cdf_to_netcdf_mapping.dat ".$filename.".".$fileext.";tar cvfz ".$filename.".tar.gz ".$filename.".".$fileext." ".$filename.".nc";
							exec($cmd);
    						echo '{success:true, file:"'.$filename.'.tar.gz"}';
						}else{
							$msg="Not CDF Format";
    						echo '{success:false, msg:"'.$msg.'"}';
						}
						break;
					case "netCDF-cdf":
						if($fileext=="nc"){
							$cmd="cd ".$storedir.";../".$tooldir."netCDF-to-cdf -map ../".$tooldir."netcdf_to_cdf_mapping.dat ".$filename.".".$fileext.";tar cvfz ".$filename.".tar.gz ".$filename.".".$fileext." ".$filename.".cdf";
    						exec($cmd);
							echo '{success:true, file:"'.$filename.'.tar.gz"}';
						}else{
							$msg="Not netCDF Format";
    						echo '{success:false, msg:"'.$msg.'"}';
						}
						break;
					case "hdf4-cdf":
						if($filext=="hdf4"){
							$cmd="cd ".$storedir.";../".$tooldir."hdf4-to-cdf -map ../".$tooldir."hdf4_to_cdf_mapping.dat ".$filename.".".$fileext.";tar cvfz ".$filename.".tar.gz ".$filename.".".$fileext." ".$filename.".cdf";
    						exec($cmd);	
							echo '{success:true, file:"'.$filename.'.tar.gz"}';
						}else{
							$msg="Not Hdf4 Format";
    						echo '{success:false, msg:"'.$msg.'"}';
						}
						break;
					case "cdf-txt":
						$msg="On Developing";
    					echo '{success:false, msg:"'.$msg.'"}';
				}
			}
		}
	}
}
?>
