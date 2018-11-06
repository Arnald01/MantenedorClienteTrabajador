<?php
   header("Access-Control-Allow-Origin: *");
   require_once "db.php";
   
	  $json = file_get_contents("php://input");
	  $data = json_decode($json,true);
	  $_POST = $data;
	   
	if($_POST == null){
		$res->mensaje = "No llegaron datos al servidor";
	}else{	//else 01
		$rut = $_POST["rut"];
		$correo = $_POST["correo"];
		$nombre = $_POST["nombre"];
		$apellido = $_POST["apellido"];
		$descripcion = $_POST["Descripcion"];
		$tipo_cuenta = $_POST["tipo_cuenta"];
		$fono = $_POST["fono"];
		$pass= $_POST["contrasena"];
		$origin = $_POST["origin"];

			//UPDATE DE LA CUENTA PARA VERIFICAR SI HAY ERROR DE DUPLICIDAD DE CORREO
		 	if($origin != $correo){	 		
				$link = conectar();
				$sql = "SELECT nombre FROM TRABAJADOR WHERE correo = '$correo'";
				$total = mysqli_num_rows(mysqli_query($link,$sql));
					if($total == 0){
						$res ="Exito";
						$sql1="UPDATE CUENTA SET correo='$correo', contrasena='$pass',tipo_cuenta='$tipo_cuenta' WHERE correo='$origin'";
						$respuesta=query($sql1);
						$sql = "UPDATE TRABAJADOR SET nombre='$nombre' , apellido='$apellido', correo='$correo', fono='$fono',descripcion_propia='$descripcion' WHERE rut_trabajador='$rut'";
						$respuesta=query($sql);
					}else{//SINO ES ASI , QUIERE DECIR QUE EXISTE EL CORREO 
						$res = "Existe";
						}
					
			}else{	//SI EL CORREO ORIGINAL ES IGUAL AL NUEVO INGRESADO (ESTO RETORNA 0 IGUALMENTE PERO ES VALIDO EL UPDATE)
						$res = "Exito";
						$sql = "UPDATE TRABAJADOR SET nombre='$nombre' , apellido='$apellido', correo='$correo', fono='$fono',descripcion_propia='$descripcion' WHERE rut_trabajador='$rut'";
						$respuesta=query($sql);
						$sql1="UPDATE CUENTA SET correo='$correo', contrasena='$pass',tipo_cuenta='$tipo_cuenta' WHERE correo='$origin'";
						$respuesta=query($sql1);	
				}

		  }//fin else 01
  	echo json_encode($res);
 ?>
