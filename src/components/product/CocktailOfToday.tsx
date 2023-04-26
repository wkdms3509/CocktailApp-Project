import Image from "next/image";
import { useEffect, useState } from "react";

const CocktailOfToday = () => {
  const [todayCocktail, setTodayCocktail] = useState("");

  //   useEffect(() => {
  //     try {
  //       if (cocktails.length === 0) {
  //         console.log("칵테일 데이터가 없습니다.");
  //         return;
  //       }
  //       const randomItem = getRandomItem(cocktails);
  //       setTodayCocktail(randomItem);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }, []);

  // 랜덤 값 추출
  //   const getRandomItem = (allCocktail) => {
  //     return allCocktail[Math.floor(Math.random() * allCocktail.length)];
  //   };

  let today = new Date();
  let tomorrow = new Date(today.setDate(today.getDate() + 1));

  return (
    <div className="h-4/5 font-light m-auto mb-10 mt-6 p-14 text-center dark:bg-black/40">
      <h2 className="text-2xl pb-8 subpixel-antialiased font-playfair">
        오늘의 칵테일
      </h2>
      <h3 className="title_name text-black pb-6 font-semibold">Negroni</h3>
      <Image
        alt="네그로니"
        src="/img/todayscocktail.png"
        width="250"
        height="250"
        className="mx-auto"
      />
      <p className="pt-8 underline-offset-8 underline decoration-dotted">
        {`"네그로니 칵테일 한 잔으로 즐기는 여름의 낭만"`}
      </p>
      <div className=" w-3/5 mx-auto py-10">
        <h3 className="font-normal py-6">특징</h3>
        <p className="text-start leading-loose">
          진, 캄파리, 베르무트가 완벽한 삼위일체를 이루는 ‘네그로니’는
          쌉쌀하면서도 달콤한 맛이 조화를 이루는 매력적인 칵테일이다. 1961년 IBA
          공식 레시피가 작성된 이래부터 현재까지 한 번도 빠짐 없이 공식 레시피에
          오른 칵테일이다. 언젠가 배우 맷 하넥은 말했다. “네그로니는 미학, 맛,
          호소력 등 어떤 부분에서도 흠잡을 데 없이 훌륭합니다. 식전이나 식후에도
          마실 수 있고요. 하지만, 이건 초보자를 위한 칵테일이 아닙니다. 숙련자
          수준의, 그리고 어른의 입맛을 위한 술이죠. 무슨 뜻인지 아시죠?”
        </p>
        <h3 className="font-normal py-6">유래</h3>
        <p className="text-start leading-loose">
          칵테일의 이름은 이탈리아의 네그로니 백작에서 유래한 것이다. 그 전설은
          100여 년 전으로 거슬러 올라간다. <br />
          세상 물정에 밝은 한 이탈리아인 백작은 어느 날 피렌체에 위치한 카페
          ‘카소니’에 우연히 방문해 우리에게 너무나 친근한 이름의 ‘아메리카노’를
          주문했다. 이는 우리가 아는 커피 아메리카노가 아닌, 캄파리와 레드
          베르무트 그리고 소다수가 들어가는 칵테일의 일종인 아메리카노를 뜻한다.
          여기서 백작은 한 가지 변주를 줬다. 아메리카노 칵테일에 들어가는
          소다수를 진으로 바꿔달라고 요청한 것이다. 바텐더는 그의 요청을
          들어줬고, 그렇게 짜잔! 역사적인 칵테일이 탄생했다. 이후 바텐더는
          백작의 이름을 따 칵테일 이름을 ‘네그로니’라고 명명했다.
        </p>
        <h3 className="font-normal py-6">레시피</h3>
        <ul className="flex flex-row justify-center py-6">
          <li className="mx-2">
            <Image
              src="/img/ice.png"
              width="75"
              height="70"
              alt="ice"
              className="w-auto h-auto"
            />
          </li>
          <li className="mx-3">
            <Image
              src="/img/orange.png"
              width="65"
              height="75"
              alt="orange"
              className="w-auto h-auto"
            />
          </li>
          <li className="mx-4">
            <Image
              src="/img/campari.png"
              width="30"
              height="80"
              alt="campari"
              className="w-auto h-auto"
            />
          </li>
          <li className="mx-3">
            <Image
              src="/img/jin.png"
              width="50"
              height="68"
              alt="jin"
              className="w-auto h-auto"
            />
          </li>
          <li className="mx-3">
            <Image
              src="/img/sweet.png"
              width="50"
              height="68"
              alt="sweet"
              className="w-auto h-auto"
            />
          </li>
        </ul>
        <ul className="flex flex-col leading-loose">
          <li className="mx-3">1. 올드패션드 락글라스에 얼음을 채운다.</li>
          <li className="mx-3">
            2. 얼음 위에 진 30ml, 스위트 베르무트 30ml, 캄파리 30ml, 커피 리큐어
            10ml(필수아님. 칼루아 대체 가능)를 넣고 섞는다.
          </li>
          <li className="mx-3">
            3. 가니시용 오렌지 슬라이스와 커피콩으로 장식한다.
          </li>
        </ul>
      </div>

      {/*   서버에서 받은 칵테일에서 랜덤 */}
      {/* <h3 className="title_name text-[#d1cbc1]">{todayCocktail.name}</h3> 
      {todayCocktail ? (
        <Image
          alt={todayCocktail.name}
          src={todayCocktail.img}
          width="150"
          height="150"
        />
      ) : (
        <div className="text-[#d1cbc1] font-light">
          데이터를 찾지 못했습니다.
        </div>
      )} */}
    </div>
  );
};

export default CocktailOfToday;
