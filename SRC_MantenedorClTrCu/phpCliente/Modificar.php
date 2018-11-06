<?php
   header("Access-Control-Allow-Origin: *");
   require_once "db.php";
   
	  $json = file_get_contents("php://input");
	  $data = json_decode($json,true);
	  $_POST = $data;
	   
	if($_POST == null){
		$res->mensaje = "No llegaron datos al servidor";
	}else{	//else 01
		$cod_cl = $_POST["cod_cliente"];
		$correo = $_POST["correo"];
		$nombre = $_POST["nombre"];
		$apellido = $_POST["apellido"];
		$sexo = $_POST["sexo"];
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
						$sql1="UPDATE CUENTA SET correo='$correo', contrasena='$pass' WHERE correo='$origin'";
						$respuesta=query($sql1);

						$sql = "UPDATE CLIENTE SET nombre='$nombre' , apellido='$apellido', correo='$correo', fono='$fono',sexo='$sexo' WHERE cod_cliente='$cod_cl'";
						$respuesta=query($sql);
					}else{//SINO ES ASI , QUIERE DECIR QUE EXISTE EL CORREO 
						$res = "Existe";
						}
					
			}else{	//SI EL CORREO ORIGINAL ES IGUAL AL NUEVO INGRESADO (ESTO RETORNA 0 IGUALMENTE PERO ES VALIDO EL UPDATE)
						$res = "Exito";
						$sql = "UPDATE CLIENTE SET nombre='$nombre' , apellido='$apellido', correo='$correo', fono='$fono',sexo='$sexo' WHERE cod_cliente='$cod_cl'";
						$respuesta=query($sql);
						$sql1="UPDATE CUENTA SET correo='$correo', contrasena='$pass' WHERE correo='$origin'";
						$respuesta=query($sql1);	
				}

		  }//fin else 01
  	echo json_encode($res);
 ?>
