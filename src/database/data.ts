import prisma from "./prisma";

async function AddData() {
  await prisma.category.createMany({
    data: [
      {
        name: "Combos",
        imgCover:
          "https://www.imagensempng.com.br/wp-content/uploads/2021/02/18-2.png",
      },
      {
        name: "Acompanhamentos",
        imgCover: "https://iloveburger.com.br/images/img-porcoes.png",
      },
      {
        name: "Bebidas",
        imgCover:
          "https://conviter.com/storage/icones/1547052023080364cbf629d6aec.png",
      },
      {
        name: "Sobremesas",
        imgCover:
          "https://png.pngtree.com/png-clipart/20240229/original/pngtree-sweet-cake-slice-strawberry-cake-love-and-valentines-day-concept-png-image_14454662.png",
      },
    ],
  });

  await prisma.additional.createMany({
    data: [
      {
        name: "Bacon",
        price: 1,
        imgCover:
          "https://img.freepik.com/fotos-premium/detalhe-de-fatias-de-bacon-frito-quente-crocante_878798-1385.jpg?w=900",
        type: "ingredient",
        description: "10g",
      },
      {
        name: "Cheddar",
        price: 1,
        imgCover:
          "https://cdn.awsli.com.br/1572/1572983/produto/191450358/877fe09-12500251-s8xj8ge1gr.png",
        type: "ingredient",
        description: "10g",
      },
      {
        name: "Molho acompanhamento",
        price: 1,
        imgCover:
          "https://i.pinimg.com/564x/4f/3e/e2/4f3ee2cb7508b3edee542b2218635fb1.jpg",
        type: "ingredient",
        description: "Barbecue",
      },
    ],
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Smash da casa",
        price: 30.5,
        imgCover:
          "https://catracalivre.com.br/wp-content/uploads/2015/03/lanche2.png",
        description:
          "2x hambúrguer 200g, queijo, cheddar, tomate, alface, picles, cebola, molho da casa",
        category_id: 1,
      },
      {
        name: "Smash da casa",
        price: 30.5,
        imgCover:
          "https://catracalivre.com.br/wp-content/uploads/2015/03/lanche2.png",
        description:
          "2x hambúrguer 200g, queijo, cheddar, tomate, alface, picles, cebola, molho da casa",
        category_id: 1,
      },
      {
        name: "Smash da casa",
        price: 30.5,
        imgCover:
          "https://catracalivre.com.br/wp-content/uploads/2015/03/lanche2.png",
        description:
          "2x hambúrguer 200g, queijo, cheddar, tomate, alface, picles, cebola, molho da casa",
        category_id: 1,
      },
    ],
  });
}

export default AddData;
