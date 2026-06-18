process.env.NODE_ENV = "test";
process.env.DATABASE_URL ??= "postgresql://postgres:postgres@localhost:5432/ai_generator_test";
process.env.JWT_ACCESS_SECRET ??= "test_access_secret_123456789";
process.env.JWT_REFRESH_SECRET ??= "test_refresh_secret_123456789";
process.env.FRONTEND_URL ??= "http://localhost:3000";
