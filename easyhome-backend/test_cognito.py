import sys, os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '.')))
from app.services.cognito_service import cognito_service

if __name__ == "__main__":
    print("\n Obteniendo atributos del usuario en Cognito...\n")
    email = os.getenv("COGNITO_TEST_EMAIL")
    if not email:
        raise SystemExit("Falta definir COGNITO_TEST_EMAIL para ejecutar esta prueba.")

    atributos = cognito_service.get_user_by_email(email)
    print(atributos or "⚠️ No se encontraron atributos o credenciales inválidas.")
