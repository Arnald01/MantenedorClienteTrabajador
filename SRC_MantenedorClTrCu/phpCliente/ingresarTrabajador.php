<?php
   header("Access-Control-Allow-Origin: *");
   header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
   header('Access-Control-Allow-Headers: Origin, Content-Type');
   require_once "db.php";

	  $json = file_get_contents("php://input");
	  $data = json_decode($json,true);
	  $_POST = $data;
	   
	if($_POST == null){
		$res->mensaje = "No llegaron datos al servidor";
	}else{	
		if($_POST!=null)){
			$nombre=$_POST["nombre"];
			$apellido=$_POST["apellido"];
			$fono = $_POST["fono"];
			$sexo = $_POST["sexo"];
			$correo=$_POST["correo"];
			$fecha= $_POST["fecha_creacion"];
			$cargo= $_POST["tipo_cuenta"];
			$pass= $_POST["contrasena"];
			$sql1 = "INSERT INTO CUENTA (correo,contrasena,fecha_creacion,tipo_cuenta) VALUES('$correo','$pass','$fecha','$cargo')";
			$resultado1 = query($sql1);
			$res1=$resultado1;
			
			if($res1->mensaje == 'exitoso!'){
			$sql2 ="INSERT INTO CLIENTE (correo,nombre,apellido,sexo,fono) VALUES ('$correo','$nombre','$apellido','$sexo','$fono')";
			$resultado2 = query($sql2);
			$res2=$resultado2;
			}	
				
				
      		       }else{ $res->mensaje = "Datos incompletos"; }
	
				

		  }
  	echo json_encode($res1);
 ?>					
