<?php
   header("Access-Control-Allow-Origin: *");
   header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
   header('Access-Control-Allow-Headers: Origin, Content-Type');
   require_once "db.php";
    $json = file_get_contents("php://input");
    $data = json_decode($json,true);
    $_POST = $data;
        if($_POST == NULL){
            $res -> mensaje = "No llegaron datos";
        }else{
             if($_POST['correo']!= NULL){
                $correo = $_POST;
                $sql = "DELETE FROM CUENTA WHERE correo= '$correo' ";
                $resultado = query($sql);   

			if($resultado == "exitoso!"){
				$res->mensaje = "Eliminacion exitosa";		
			}else{
				$res = $resultado;
             }
        }
    }

        echo json_encode($res);
?>
