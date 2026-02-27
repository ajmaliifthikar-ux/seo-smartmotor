import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function migrate() {
    console.log('🚀 Starting History Key Migration...');

    // 1. Get all history/audit records for Services and Brands
    const historyRecords = await prisma.contentHistory.findMany({
        where: { entityType: { in: ['Service', 'Brand'] } }
    });

    const auditRecords = await prisma.contentAudit.findMany({
        where: { entityType: { in: ['Service', 'Brand'] } }
    });

    // 2. Fetch all Services and Brands to map slugs/ids
    const services = await prisma.service.findMany();
    const brands = await prisma.brand.findMany();

    const serviceMap = new Map(services.map(s => [s.slug, s.id]));
    const brandMap = new Map(brands.map(b => [b.slug || b.id, b.id]));

    // 3. Update History
    for (const record of historyRecords) {
        const map = record.entityType === 'Service' ? serviceMap : brandMap;
        const correctId = map.get(record.key);

        if (correctId && correctId !== record.key) {
            await prisma.contentHistory.update({
                where: { id: record.id },
                data: { key: correctId }
            });
            console.log(`✅ Updated History [${record.entityType}] ${record.key} -> ${correctId}`);
        }
    }

    // 4. Update Audit
    for (const record of auditRecords) {
        const map = record.entityType === 'Service' ? serviceMap : brandMap;
        const correctId = map.get(record.key);

        if (correctId && correctId !== record.key) {
            await prisma.contentAudit.update({
                where: { id: record.id },
                data: { key: correctId }
            });
            console.log(`✅ Updated Audit [${record.entityType}] ${record.key} -> ${correctId}`);
        }
    }

    console.log('🏁 Migration Complete.');
}

migrate()
    .catch(err => console.error(err))
    .finally(() => prisma.$disconnect());
