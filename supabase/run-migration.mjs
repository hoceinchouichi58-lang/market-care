// سكربت مؤقت لتشغيل ملفات SQL على قاعدة بيانات Supabase
// الاستخدام: node supabase/run-migration.mjs <path-to-sql>
import fs from "node:fs";
import path from "node:path";
import pg from "pg";

const { Client } = pg;

const PROJECT_REF = "ryghojqcrzokshzxbkhz";
const PASSWORD = process.env.SUPABASE_DB_PASSWORD;
const REGION = "eu-central-1";

if (!PASSWORD) {
  console.error("ضع كلمة مرور قاعدة البيانات في متغير البيئة SUPABASE_DB_PASSWORD");
  process.exit(1);
}

const sqlFile = process.argv[2];
if (!sqlFile) {
  console.error("Usage: node run-migration.mjs <path-to-sql>");
  process.exit(1);
}
const sql = fs.readFileSync(path.resolve(sqlFile), "utf8");

// مرشحات الاتصال (نجرّبها بالترتيب حتى ينجح أحدها)
const candidates = [
  {
    label: "Session Pooler (aws-0)",
    host: `aws-0-${REGION}.pooler.supabase.com`,
    port: 5432,
    user: `postgres.${PROJECT_REF}`,
  },
  {
    label: "Session Pooler (aws-1)",
    host: `aws-1-${REGION}.pooler.supabase.com`,
    port: 5432,
    user: `postgres.${PROJECT_REF}`,
  },
  {
    label: "Direct connection",
    host: `db.${PROJECT_REF}.supabase.co`,
    port: 5432,
    user: "postgres",
  },
];

async function tryConnect(c) {
  const client = new Client({
    host: c.host,
    port: c.port,
    user: c.user,
    password: PASSWORD,
    database: "postgres",
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 15000,
  });
  await client.connect();
  return client;
}

let client = null;
for (const c of candidates) {
  try {
    process.stdout.write(`Trying ${c.label} (${c.host})... `);
    client = await tryConnect(c);
    console.log("CONNECTED ✓");
    break;
  } catch (err) {
    console.log(`failed: ${err.message}`);
  }
}

if (!client) {
  console.error("\n❌ تعذّر الاتصال بأي من نقاط الدخول. تحقق من كلمة المرور أو المنطقة.");
  process.exit(2);
}

try {
  await client.query(sql);
  console.log("\n✅ تم تنفيذ ملف SQL بنجاح!");
} catch (err) {
  console.error("\n❌ خطأ أثناء تنفيذ SQL:", err.message);
  process.exitCode = 3;
} finally {
  await client.end();
}
