import { prisma } from '../src/common/database/prisma.service';

async function main() {
  console.log('🧹 Очистка базы...');
  await prisma.productWorkshop.deleteMany();
  await prisma.product.deleteMany();
  await prisma.workshop.deleteMany();
  await prisma.material.deleteMany();
  await prisma.productType.deleteMany();

  // ==================== PRODUCT TYPES ====================
  const productTypes = await prisma.productType.createMany({
    data: [
      { name: 'Гостиные', coefficient: 3.5 },
      { name: 'Прихожие', coefficient: 5.6 },
      { name: 'Мягкая мебель', coefficient: 3.0 },
      { name: 'Кровати', coefficient: 4.7 },
      { name: 'Шкафы', coefficient: 1.5 },
      { name: 'Комоды', coefficient: 2.3 },
    ],
  });

  // ==================== MATERIALS ====================
  const materials = await prisma.material.createMany({
    data: [
      { name: 'Мебельный щит из массива дерева', lossPercent: 0.008 },
      { name: 'Ламинированное ДСП', lossPercent: 0.007 },
      { name: 'Фанера', lossPercent: 0.0055 },
      { name: 'МДФ', lossPercent: 0.003 },
    ],
  });

  // ==================== WORKSHOPS ====================
  const workshops = await prisma.workshop.createMany({
    data: [
      { name: 'Проектный', type: 'Проектирование', workers: 4 },
      { name: 'Расчетный', type: 'Проектирование', workers: 5 },
      { name: 'Раскроя', type: 'Обработка', workers: 5 },
      { name: 'Обработки', type: 'Обработка', workers: 6 },
      { name: 'Сушильный', type: 'Сушка', workers: 3 },
      { name: 'Покраски', type: 'Обработка', workers: 5 },
      { name: 'Столярный', type: 'Обработка', workers: 7 },
      {
        name: 'Изготовления изделий из искусственного камня и композитных материалов',
        type: 'Обработка',
        workers: 3,
      },
      { name: 'Изготовления мягкой мебели', type: 'Обработка', workers: 5 },
      {
        name: 'Монтажа стеклянных, зеркальных вставок и других изделий',
        type: 'Сборка',
        workers: 2,
      },
      { name: 'Сборки', type: 'Сборка', workers: 6 },
      { name: 'Упаковки', type: 'Сборка', workers: 4 },
    ],
  });

  // ==================== PRODUCTS ====================
  const typeMap = await prisma.productType.findMany();
  const materialMap = await prisma.material.findMany();

  const typeByName = Object.fromEntries(typeMap.map((t) => [t.name, t.id]));
  const materialByName = Object.fromEntries(
    materialMap.map((m) => [m.name, m.id])
  );

  const productsData = [
    {
      type: 'Гостиные',
      name: 'Комплект мебели для гостиной Ольха горная',
      article: '1549922',
      material: 'Мебельный щит из массива дерева',
      minPrice: 160507,
    },
    {
      type: 'Гостиные',
      name: 'Стенка для гостиной Вишня темная',
      article: '1018556',
      material: 'Мебельный щит из массива дерева',
      minPrice: 216907,
    },
    {
      type: 'Прихожие',
      name: 'Прихожая Венге Винтаж',
      article: '3028272',
      material: 'Ламинированное ДСП',
      minPrice: 24970,
    },
    {
      type: 'Прихожие',
      name: 'Тумба с вешалкой Дуб натуральный',
      article: '3029272',
      material: 'Ламинированное ДСП',
      minPrice: 18206,
    },
    {
      type: 'Прихожие',
      name: 'Прихожая-комплект Дуб темный',
      article: '3028248',
      material: 'Мебельный щит из массива дерева',
      minPrice: 177509,
    },
    {
      type: 'Мягкая мебель',
      name: 'Диван-кровать угловой Книжка',
      article: '7118827',
      material: 'Мебельный щит из массива дерева',
      minPrice: 85900,
    },
    {
      type: 'Мягкая мебель',
      name: 'Диван модульный Телескоп',
      article: '7137981',
      material: 'Мебельный щит из массива дерева',
      minPrice: 75900,
    },
    {
      type: 'Мягкая мебель',
      name: 'Диван-кровать Соло',
      article: '7029787',
      material: 'Мебельный щит из массива дерева',
      minPrice: 120345,
    },
    {
      type: 'Мягкая мебель',
      name: 'Детский диван Выкатной',
      article: '7758953',
      material: 'Фанера',
      minPrice: 25990,
    },
    {
      type: 'Кровати',
      name: 'Кровать с подъемным механизмом с матрасом 1600х2000 Венге',
      article: '6026662',
      material: 'Мебельный щит из массива дерева',
      minPrice: 69500,
    },
    {
      type: 'Кровати',
      name: 'Кровать с матрасом 90х2000 Венге',
      article: '6159043',
      material: 'Ламинированное ДСП',
      minPrice: 55600,
    },
    {
      type: 'Кровати',
      name: 'Кровать универсальная Дуб натуральный',
      article: '6588376',
      material: 'Ламинированное ДСП',
      minPrice: 37900,
    },
    {
      type: 'Кровати',
      name: 'Кровать с ящиками Ясень белый',
      article: '6758375',
      material: 'Фанера',
      minPrice: 46750,
    },
    {
      type: 'Шкафы',
      name: 'Шкаф-купе 3-х дверный Сосна белая',
      article: '2759324',
      material: 'Ламинированное ДСП',
      minPrice: 131560,
    },
    {
      type: 'Шкафы',
      name: 'Стеллаж Бук натуральный',
      article: '2118827',
      material: 'Мебельный щит из массива дерева',
      minPrice: 38700,
    },
    {
      type: 'Шкафы',
      name: 'Шкаф 4 дверный с ящиками Ясень серый',
      article: '2559898',
      material: 'Фанера',
      minPrice: 160151,
    },
    {
      type: 'Шкафы',
      name: 'Шкаф-пенал Береза белый',
      article: '2259474',
      material: 'Фанера',
      minPrice: 40500,
    },
    {
      type: 'Комоды',
      name: 'Комод 6 ящиков Вишня светлая',
      article: '4115947',
      material: 'Мебельный щит из массива дерева',
      minPrice: 61235,
    },
    {
      type: 'Комоды',
      name: 'Комод 4 ящика Вишня светлая',
      article: '4033136',
      material: 'Мебельный щит из массива дерева',
      minPrice: 41200,
    },
    {
      type: 'Комоды',
      name: 'Тумба под ТВ',
      article: '4028048',
      material: 'МДФ',
      minPrice: 12350,
    },
  ];

  await prisma.product.createMany({
    data: productsData.map((p) => ({
      name: p.name,
      article: p.article,
      typeId: typeByName[p.type],
      materialId: materialByName[p.material],
      minPrice: p.minPrice,
    })),
  });

  // ==================== PRODUCT WORKSHOPS ====================
  const allProducts = await prisma.product.findMany();
  const allWorkshops = await prisma.workshop.findMany();

  const productByArticle = Object.fromEntries(
    allProducts.map((p) => [p.article, p.id])
  );
  const workshopByName = Object.fromEntries(
    allWorkshops.map((w) => [w.name, w.id])
  );

  const productWorkshops = [
    {
      article: '6026662',
      workshop:
        'Изготовления изделий из искусственного камня и композитных материалов',
      time: 2.0,
    },
    {
      article: '4028048',
      workshop:
        'Изготовления изделий из искусственного камня и композитных материалов',
      time: 2.7,
    },

    { article: '7118827', workshop: 'Изготовления мягкой мебели', time: 4.2 },
    { article: '7137981', workshop: 'Изготовления мягкой мебели', time: 4.5 },
    { article: '7029787', workshop: 'Изготовления мягкой мебели', time: 4.7 },
    { article: '7758953', workshop: 'Изготовления мягкой мебели', time: 4.0 },
    { article: '6159043', workshop: 'Изготовления мягкой мебели', time: 5.5 },

    {
      article: '1018556',
      workshop: 'Монтажа стеклянных, зеркальных вставок и других изделий',
      time: 0.3,
    },
    {
      article: '3028272',
      workshop: 'Монтажа стеклянных, зеркальных вставок и других изделий',
      time: 0.5,
    },
    {
      article: '3028248',
      workshop: 'Монтажа стеклянных, зеркальных вставок и других изделий',
      time: 0.3,
    },
    {
      article: '6026662',
      workshop: 'Монтажа стеклянных, зеркальных вставок и других изделий',
      time: 0.5,
    },
    {
      article: '2759324',
      workshop: 'Монтажа стеклянных, зеркальных вставок и других изделий',
      time: 0.5,
    },
    {
      article: '4028048',
      workshop: 'Монтажа стеклянных, зеркальных вставок и других изделий',
      time: 1.0,
    },

    { article: '1549922', workshop: 'Обработки', time: 0.5 },
    { article: '1018556', workshop: 'Обработки', time: 0.3 },
    { article: '3028272', workshop: 'Обработки', time: 0.5 },
    { article: '3029272', workshop: 'Обработки', time: 0.5 },
    { article: '3028248', workshop: 'Обработки', time: 0.5 },
    { article: '7118827', workshop: 'Обработки', time: 0.5 },
    { article: '7137981', workshop: 'Обработки', time: 0.5 },
    { article: '7029787', workshop: 'Обработки', time: 0.5 },
    { article: '7758953', workshop: 'Обработки', time: 0.3 },
    { article: '6026662', workshop: 'Обработки', time: 0.6 },
    { article: '6159043', workshop: 'Обработки', time: 1.0 },
    { article: '6588376', workshop: 'Обработки', time: 0.8 },
    { article: '6758375', workshop: 'Обработки', time: 2.0 },
    { article: '2759324', workshop: 'Обработки', time: 0.5 },
    { article: '2118827', workshop: 'Обработки', time: 0.3 },
    { article: '2559898', workshop: 'Обработки', time: 1.5 },
    { article: '2259474', workshop: 'Обработки', time: 1.0 },
    { article: '4115947', workshop: 'Обработки', time: 0.5 },
    { article: '4033136', workshop: 'Обработки', time: 0.4 },
    { article: '4028048', workshop: 'Обработки', time: 0.5 },

    { article: '1549922', workshop: 'Покраски', time: 0.3 },
    { article: '1018556', workshop: 'Покраски', time: 0.4 },
    { article: '3028248', workshop: 'Покраски', time: 0.5 },
    { article: '7118827', workshop: 'Покраски', time: 0.5 },
    { article: '7137981', workshop: 'Покраски', time: 1.0 },
    { article: '7029787', workshop: 'Покраски', time: 0.5 },
    { article: '7758953', workshop: 'Покраски', time: 0.5 },
    { article: '6026662', workshop: 'Покраски', time: 0.4 },
    { article: '6758375', workshop: 'Покраски', time: 1.5 },
    { article: '2118827', workshop: 'Покраски', time: 1.0 },
    { article: '2259474', workshop: 'Покраски', time: 2.5 },
    { article: '4115947', workshop: 'Покраски', time: 1.0 },
    { article: '4033136', workshop: 'Покраски', time: 0.4 },
    { article: '4028048', workshop: 'Покраски', time: 0.5 },

    { article: '1549922', workshop: 'Проектный', time: 1.0 },
    { article: '1018556', workshop: 'Проектный', time: 1.0 },
    { article: '3028248', workshop: 'Проектный', time: 1.5 },
    { article: '7029787', workshop: 'Проектный', time: 0.5 },
    { article: '2759324', workshop: 'Проектный', time: 2.0 },
    { article: '2118827', workshop: 'Проектный', time: 1.0 },
    { article: '4028048', workshop: 'Проектный', time: 1.0 },

    { article: '1549922', workshop: 'Раскроя', time: 1.0 },
    { article: '1018556', workshop: 'Раскроя', time: 1.0 },
    { article: '3028272', workshop: 'Раскроя', time: 1.0 },
    { article: '3029272', workshop: 'Раскроя', time: 1.0 },
    { article: '3028248', workshop: 'Раскроя', time: 1.0 },
    { article: '7118827', workshop: 'Раскроя', time: 1.0 },
    { article: '7137981', workshop: 'Раскроя', time: 1.0 },
    { article: '7029787', workshop: 'Раскроя', time: 0.5 },
    { article: '7758953', workshop: 'Раскроя', time: 0.7 },
    { article: '6026662', workshop: 'Раскроя', time: 1.0 },
    { article: '6159043', workshop: 'Раскроя', time: 1.0 },
    { article: '6588376', workshop: 'Раскроя', time: 1.1 },
    { article: '6758375', workshop: 'Раскроя', time: 2.0 },
    { article: '2759324', workshop: 'Раскроя', time: 1.0 },
    { article: '2118827', workshop: 'Раскроя', time: 1.0 },
    { article: '2559898', workshop: 'Раскроя', time: 1.0 },
    { article: '2259474', workshop: 'Раскроя', time: 1.0 },
    { article: '4115947', workshop: 'Раскроя', time: 1.0 },
    { article: '4033136', workshop: 'Раскроя', time: 1.0 },
    { article: '4028048', workshop: 'Раскроя', time: 0.6 },

    { article: '1549922', workshop: 'Расчетный', time: 0.4 },
    { article: '1018556', workshop: 'Расчетный', time: 1.0 },
    { article: '3028248', workshop: 'Расчетный', time: 0.5 },
    { article: '7029787', workshop: 'Расчетный', time: 0.5 },
    { article: '2759324', workshop: 'Расчетный', time: 1.0 },
    { article: '2118827', workshop: 'Расчетный', time: 0.7 },
    { article: '4028048', workshop: 'Расчетный', time: 0.4 },

    { article: '1018556', workshop: 'Сборки', time: 1.0 },
    { article: '3028272', workshop: 'Сборки', time: 1.0 },
    { article: '3028248', workshop: 'Сборки', time: 0.5 },
    { article: '7118827', workshop: 'Сборки', time: 0.5 },
    { article: '7137981', workshop: 'Сборки', time: 0.3 },
    { article: '6588376', workshop: 'Сборки', time: 0.8 },
    { article: '6758375', workshop: 'Сборки', time: 0.3 },
    { article: '2759324', workshop: 'Сборки', time: 1.5 },
    { article: '2118827', workshop: 'Сборки', time: 0.3 },
    { article: '2559898', workshop: 'Сборки', time: 2.0 },
    { article: '4115947', workshop: 'Сборки', time: 0.3 },
    { article: '4028048', workshop: 'Сборки', time: 1.0 },

    { article: '1549922', workshop: 'Столярный', time: 1.5 },
    { article: '1018556', workshop: 'Столярный', time: 1.0 },
    { article: '3028248', workshop: 'Столярный', time: 1.0 },
    { article: '7137981', workshop: 'Столярный', time: 0.5 },
    { article: '7029787', workshop: 'Столярный', time: 0.5 },
    { article: '7758953', workshop: 'Столярный', time: 1.0 },
    { article: '2118827', workshop: 'Столярный', time: 0.5 },
    { article: '2559898', workshop: 'Столярный', time: 1.0 },
    { article: '2259474', workshop: 'Столярный', time: 3.0 },
    { article: '4115947', workshop: 'Столярный', time: 2.0 },
    { article: '4033136', workshop: 'Столярный', time: 2.0 },

    { article: '1549922', workshop: 'Сушильный', time: 2.0 },
    { article: '1018556', workshop: 'Сушильный', time: 2.0 },
    { article: '3028248', workshop: 'Сушильный', time: 2.0 },
    { article: '7118827', workshop: 'Сушильный', time: 2.0 },
    { article: '7137981', workshop: 'Сушильный', time: 2.0 },
    { article: '2118827', workshop: 'Сушильный', time: 2.0 },
    { article: '4115947', workshop: 'Сушильный', time: 2.0 },
    { article: '4033136', workshop: 'Сушильный', time: 2.0 },

    { article: '1549922', workshop: 'Упаковки', time: 0.3 },
    { article: '3029272', workshop: 'Упаковки', time: 0.5 },
    { article: '3028248', workshop: 'Упаковки', time: 0.2 },
    { article: '7118827', workshop: 'Упаковки', time: 0.3 },
    { article: '7137981', workshop: 'Упаковки', time: 0.2 },
    { article: '7029787', workshop: 'Упаковки', time: 0.3 },
    { article: '7758953', workshop: 'Упаковки', time: 0.5 },
    { article: '6026662', workshop: 'Упаковки', time: 0.5 },
    { article: '6159043', workshop: 'Упаковки', time: 0.5 },
    { article: '6588376', workshop: 'Упаковки', time: 0.3 },
    { article: '6758375', workshop: 'Упаковки', time: 0.2 },
    { article: '2759324', workshop: 'Упаковки', time: 0.5 },
    { article: '2118827', workshop: 'Упаковки', time: 0.2 },
    { article: '2559898', workshop: 'Упаковки', time: 0.5 },
    { article: '2259474', workshop: 'Упаковки', time: 0.5 },
    { article: '4115947', workshop: 'Упаковки', time: 0.2 },
    { article: '4033136', workshop: 'Упаковки', time: 0.2 },
    { article: '4028048', workshop: 'Упаковки', time: 0.3 },
  ];

  const validConnections = productWorkshops.filter((pw) => {
    if (!productByArticle[pw.article]) {
      console.warn(`⚠️  Товар с артикулом ${pw.article} не найден`);
      return false;
    }
    if (!workshopByName[pw.workshop]) {
      console.warn(`⚠️  Цех "${pw.workshop}" не найден`);
      return false;
    }
    return true;
  });

  await prisma.productWorkshop.createMany({
    data: validConnections.map((pw) => ({
      productId: productByArticle[pw.article],
      workshopId: workshopByName[pw.workshop],
      productionTime: pw.time,
    })),
  });

  const typeCount = await prisma.productType.count();
  const materialCount = await prisma.material.count();
  const workshopCount = await prisma.workshop.count();
  const productCount = await prisma.product.count();
  const connectionCount = await prisma.productWorkshop.count();

  console.log('✅ Seed completed successfully!');
  console.log(`   - Product Types: ${typeCount}`);
  console.log(`   - Materials: ${materialCount}`);
  console.log(`   - Workshops: ${workshopCount}`);
  console.log(`   - Products: ${productCount}`);
  console.log(`   - Product-Workshop connections: ${connectionCount}`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
