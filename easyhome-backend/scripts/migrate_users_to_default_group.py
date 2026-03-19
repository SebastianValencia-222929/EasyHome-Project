"""
Script para migrar usuarios de Cognito sin grupo al grupo "Clientes"

Este script:
"""Placeholder script for Cognito user migration.

This project is now structured to run locally without AWS Cognito.
If you need to perform migrations against an AWS Cognito user pool, restore
the Cognito configuration and run a dedicated script.
"""

import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def main():
    logger.info("Este script no hace nada en el modo local. Usa AWS Cognito solo si está configurado.")


if __name__ == "__main__":
    main()
            users_already_in_group += 1
            logger.info(f"✓ {email or username} ya tiene grupos: {', '.join(groups)}")
    
    # Resumen
    logger.info("")
    logger.info("=" * 60)
    logger.info("RESUMEN DE MIGRACIÓN")
    logger.info("=" * 60)
    logger.info(f"Total de usuarios: {len(users)}")
    logger.info(f"✅ Usuarios migrados: {users_migrated}")
    logger.info(f"✓ Usuarios que ya tenían grupo: {users_already_in_group}")
    if users_with_error > 0:
        logger.info(f"❌ Usuarios con error: {users_with_error}")
    logger.info("=" * 60)


if __name__ == "__main__":
    migrate_users_without_groups()
