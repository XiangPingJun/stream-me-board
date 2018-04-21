<template>  
  <div class="container">
    <div class="sky">
      <div class="stars"></div>
      <div class="stars1"></div>
      <div class="stars2"></div>
    </div>
  </div>
</template>

<style scoped>
.sky {
  height: 0px;
}
.container {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #020107 0%, #201b46 100%);
}

.stars {
  z-index: 10;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: transparent;
  box-shadow: 512px 2161px #fff, 529px 2053px #fff, 2457px 256px #fff,
    1453px 2324px #fff, 2043px 2196px #fff, 1665px 472px #fff, 677px 179px #fff,
    201px 1108px #fff, 53px 2053px #fff, 716px 643px #fff, 752px 1906px #fff,
    954px 1777px #fff, 1214px 2017px #fff, 696px 1871px #fff, 2323px 2555px #fff,
    631px 1939px #fff, 802px 1399px #fff, 232px 1354px #fff, 150px 1181px #fff,
    2072px 640px #fff, 1724px 2444px #fff, 957px 48px #fff, 2139px 2289px #fff,
    2004px 2156px #fff, 2542px 1438px #fff, 2451px 1388px #fff,
    1455px 2155px #fff, 1129px 1358px #fff, 723px 2279px #fff, 703px 1035px #fff,
    1601px 606px #fff, 577px 2047px #fff, 2055px 103px #fff, 1420px 712px #fff,
    1242px 1360px #fff, 750px 2485px #fff, 61px 2233px #fff, 2277px 2247px #fff,
    1463px 2241px #fff, 2519px 814px #fff, 1856px 1719px #fff,
    1393px 1441px #fff, 1851px 1160px #fff, 1495px 2468px #fff,
    2168px 1483px #fff, 486px 2395px #fff, 650px 945px #fff, 1063px 297px #fff,
    603px 583px #fff, 1589px 2246px #fff, 1444px 554px #fff, 780px 2052px #fff,
    247px 2483px #fff, 1907px 937px #fff, 1521px 270px #fff, 1317px 2225px #fff,
    1877px 2325px #fff, 1791px 2273px #fff, 2219px 2513px #fff,
    1850px 1415px #fff, 261px 1225px #fff, 615px 1830px #fff, 645px 1314px #fff,
    2225px 1783px #fff, 2284px 653px #fff, 2237px 101px #fff, 2463px 1317px #fff,
    1948px 1295px #fff, 2129px 1414px #fff, 1613px 2400px #fff,
    2142px 2519px #fff, 2463px 135px #fff, 274px 1605px #fff, 901px 1474px #fff,
    1854px 1728px #fff, 2349px 1207px #fff, 477px 1703px #fff, 664px 1394px #fff,
    1821px 895px #fff, 1823px 1248px #fff, 699px 2284px #fff, 1272px 593px #fff,
    999px 1868px #fff, 1340px 2419px #fff, 576px 225px #fff, 1147px 833px #fff,
    317px 1652px #fff, 767px 1159px #fff, 586px 1255px #fff, 950px 1303px #fff,
    120px 1699px #fff, 531px 1339px #fff, 1044px 860px #fff, 1008px 2242px #fff,
    2347px 2032px #fff, 1415px 2088px #fff, 414px 1657px #fff, 307px 2479px #fff,
    1103px 1134px #fff, 2489px 465px #fff, 1029px 1381px #fff,
    1625px 2295px #fff, 1446px 1293px #fff, 899px 2429px #fff,
    2542px 2308px #fff, 351px 1185px #fff, 2386px 2144px #fff,
    1504px 1838px #fff, 1847px 1000px #fff, 498px 2015px #fff, 306px 1342px #fff,
    825px 809px #fff, 2113px 1315px #fff, 1072px 725px #fff, 365px 311px #fff,
    1840px 390px #fff, 1076px 278px #fff, 1183px 533px #fff, 2464px 2474px #fff,
    965px 173px #fff, 1902px 311px #fff, 49px 1126px #fff, 1905px 854px #fff,
    733px 1411px #fff, 1732px 1651px #fff, 1494px 1742px #fff, 19px 2098px #fff,
    302px 1776px #fff, 363px 611px #fff, 204px 1070px #fff, 1538px 1462px #fff,
    125px 1540px #fff, 413px 1278px #fff, 2126px 2446px #fff, 1202px 309px #fff,
    834px 406px #fff, 1601px 1663px #fff, 1368px 2400px #fff, 967px 2107px #fff,
    563px 1774px #fff, 1407px 294px #fff, 1633px 1173px #fff, 1236px 435px #fff,
    168px 1069px #fff, 2144px 2184px #fff, 2294px 672px #fff, 348px 470px #fff,
    522px 160px #fff, 971px 1767px #fff, 2267px 748px #fff, 2216px 1853px #fff,
    1330px 570px #fff, 861px 1539px #fff, 2315px 1081px #fff, 2129px 577px #fff,
    395px 2430px #fff, 237px 2196px #fff, 128px 302px #fff, 215px 781px #fff,
    1248px 1392px #fff, 2030px 1466px #fff, 460px 1365px #fff, 1284px 942px #fff,
    1876px 1485px #fff, 1403px 494px #fff, 1560px 2344px #fff, 398px 2390px #fff,
    2263px 2448px #fff, 250px 641px #fff, 2413px 1110px #fff, 615px 28px #fff,
    801px 976px #fff, 1702px 1348px #fff, 2526px 143px #fff, 1244px 2520px #fff,
    1362px 869px #fff, 16px 455px #fff, 1456px 2446px #fff, 465px 1809px #fff,
    1404px 1019px #fff, 665px 1591px #fff, 992px 1503px #fff, 2206px 672px #fff,
    632px 1449px #fff, 1088px 600px #fff, 1744px 1474px #fff, 2000px 1270px #fff,
    2378px 2072px #fff, 1170px 392px #fff, 1968px 756px #fff, 1767px 1250px #fff,
    1356px 1058px #fff, 2138px 1746px #fff, 471px 259px #fff, 1614px 2151px #fff,
    378px 2308px #fff, 355px 315px #fff, 944px 59px #fff, 918px 2430px #fff,
    2482px 785px #fff, 919px 2073px #fff, 2293px 1122px #fff, 1279px 2494px #fff,
    1471px 2005px #fff, 859px 1398px #fff, 1361px 601px #fff, 788px 2094px #fff,
    151px 752px #fff, 2300px 293px #fff, 1348px 1740px #fff, 1660px 690px #fff,
    739px 1349px #fff, 1506px 390px #fff, 1358px 129px #fff, 749px 1257px #fff,
    2385px 1240px #fff, 400px 2203px #fff, 114px 232px #fff, 1828px 2441px #fff,
    414px 1420px #fff, 1181px 1552px #fff, 2099px 1556px #fff,
    1780px 1950px #fff, 1506px 324px #fff, 1422px 143px #fff, 2020px 14px #fff,
    2161px 2555px #fff, 639px 2458px #fff, 670px 1488px #fff, 975px 344px #fff,
    1947px 1922px #fff, 763px 1595px #fff, 838px 369px #fff, 1630px 2175px #fff,
    2000px 182px #fff, 1989px 2365px #fff, 2206px 963px #fff, 770px 759px #fff,
    612px 1579px #fff, 1256px 1621px #fff, 2312px 1481px #fff, 750px 1537px #fff,
    1354px 1240px #fff, 2287px 656px #fff, 1148px 2070px #fff,
    1874px 1820px #fff, 1093px 1998px #fff, 447px 1190px #fff, 455px 2471px #fff,
    1878px 919px #fff, 175px 1301px #fff, 956px 578px #fff, 102px 183px #fff,
    630px 1770px #fff, 1729px 1824px #fff, 860px 1415px #fff, 159px 1713px #fff,
    1381px 1220px #fff, 437px 1824px #fff, 1885px 877px #fff, 2547px 573px #fff,
    2468px 758px #fff, 1883px 2056px #fff, 1923px 975px #fff, 1433px 1153px #fff,
    1664px 575px #fff, 1168px 2143px #fff, 865px 2405px #fff, 130px 885px #fff,
    1025px 1634px #fff, 991px 1922px #fff, 2305px 414px #fff, 355px 378px #fff,
    435px 1931px #fff, 474px 944px #fff, 1671px 840px #fff, 133px 2226px #fff,
    837px 38px #fff, 1110px 2052px #fff, 405px 971px #fff, 610px 466px #fff,
    112px 548px #fff, 1784px 683px #fff, 1069px 165px #fff, 752px 2263px #fff,
    1266px 880px #fff, 1867px 2111px #fff, 2191px 2136px #fff,
    2342px 1095px #fff, 2450px 680px #fff, 2245px 1446px #fff, 571px 868px #fff,
    489px 818px #fff, 1648px 839px #fff, 381px 723px #fff, 712px 939px #fff,
    371px 362px #fff, 1678px 2052px #fff, 378px 2147px #fff, 97px 223px #fff,
    888px 286px #fff, 844px 1314px #fff, 597px 165px #fff, 2456px 872px #fff,
    278px 682px #fff, 81px 2039px #fff, 1543px 348px #fff, 42px 468px #fff,
    72px 438px #fff, 1757px 2528px #fff, 220px 2234px #fff, 520px 1230px #fff,
    1495px 1090px #fff, 286px 742px #fff, 1044px 1248px #fff, 1449px 2373px #fff,
    2019px 1450px #fff, 1320px 1405px #fff, 17px 2144px #fff, 2017px 495px #fff,
    1510px 278px #fff, 1796px 1125px #fff, 675px 728px #fff, 893px 48px #fff,
    1732px 856px #fff, 555px 1482px #fff, 748px 629px #fff, 11px 101px #fff,
    2384px 2214px #fff, 776px 651px #fff, 270px 1667px #fff, 2110px 959px #fff,
    1781px 1046px #fff, 1814px 2074px #fff, 2208px 836px #fff,
    1775px 1069px #fff, 1084px 556px #fff, 934px 507px #fff, 2548px 160px #fff,
    533px 457px #fff, 648px 1240px #fff, 2401px 1188px #fff, 984px 1953px #fff,
    169px 806px #fff, 1591px 1012px #fff, 419px 2441px #fff, 639px 42px #fff,
    297px 2202px #fff, 702px 819px #fff, 1906px 1429px #fff, 2375px 20px #fff,
    2290px 673px #fff, 1821px 1432px #fff, 42px 1421px #fff, 2490px 811px #fff,
    2283px 1588px #fff, 806px 1934px #fff, 2478px 1722px #fff,
    1675px 1662px #fff, 415px 537px #fff, 1340px 1852px #fff, 693px 318px #fff,
    491px 816px #fff, 1956px 1581px #fff, 2423px 1248px #fff, 162px 488px #fff,
    212px 1305px #fff, 1786px 585px #fff, 523px 1205px #fff, 951px 1664px #fff,
    888px 1151px #fff, 2248px 901px #fff, 352px 2160px #fff, 328px 495px #fff,
    1814px 1897px #fff, 128px 2449px #fff, 100px 32px #fff, 639px 692px #fff,
    977px 1351px #fff, 1471px 112px #fff, 305px 359px #fff, 1377px 2013px #fff,
    1523px 723px #fff, 1628px 2481px #fff, 735px 1291px #fff, 1560px 334px #fff,
    1905px 312px #fff, 761px 1600px #fff, 127px 1163px #fff, 765px 360px #fff,
    182px 1273px #fff, 672px 2085px #fff, 1398px 920px #fff, 1029px 225px #fff,
    691px 2045px #fff, 2518px 2338px #fff, 2490px 2229px #fff, 975px 2351px #fff,
    2532px 128px #fff, 287px 54px #fff;
  animation: animStar 100s linear infinite;
}
.stars:after {
  content: " ";
  top: -600px;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  position: absolute;
  backgroud: transparent;
  box-shadow: 440px 2289px #fff, 2027px 205px #fff, 1060px 368px #fff,
    2516px 470px #fff, 1441px 1585px #fff, 1117px 1128px #fff, 486px 1525px #fff,
    434px 1438px #fff, 1475px 2055px #fff, 2020px 1088px #fff,
    1575px 1408px #fff, 1041px 232px #fff, 2464px 1996px #fff, 586px 2549px #fff,
    2142px 668px #fff, 1197px 44px #fff, 1963px 1085px #fff, 1013px 60px #fff,
    2499px 685px #fff, 1927px 945px #fff, 2498px 1825px #fff, 2549px 2457px #fff,
    1359px 1396px #fff, 747px 1141px #fff, 1414px 2254px #fff, 802px 1179px #fff,
    838px 1510px #fff, 1599px 2056px #fff, 1921px 13px #fff, 427px 1904px #fff,
    308px 459px #fff, 1730px 1015px #fff, 2530px 544px #fff, 448px 2278px #fff,
    414px 961px #fff, 2503px 2468px #fff, 285px 97px #fff, 702px 1127px #fff,
    2065px 1220px #fff, 1757px 749px #fff, 543px 2447px #fff, 1469px 2229px #fff,
    2235px 2061px #fff, 2069px 1012px #fff, 1625px 1483px #fff,
    1488px 750px #fff, 2447px 2004px #fff, 1929px 962px #fff, 1580px 1093px #fff,
    3px 2459px #fff, 964px 655px #fff, 593px 975px #fff, 2040px 1849px #fff,
    1975px 729px #fff, 1076px 221px #fff, 2515px 1017px #fff, 1974px 1868px #fff,
    1766px 283px #fff, 1126px 2382px #fff, 900px 2170px #fff, 399px 1609px #fff,
    839px 1463px #fff, 1159px 173px #fff, 1190px 1134px #fff, 989px 2325px #fff,
    363px 1163px #fff, 212px 2462px #fff, 691px 1019px #fff, 290px 907px #fff,
    2539px 1164px #fff, 1276px 98px #fff, 348px 1786px #fff, 1207px 2314px #fff,
    1016px 1275px #fff, 527px 375px #fff, 1011px 393px #fff, 1833px 460px #fff,
    2421px 2114px #fff, 843px 1538px #fff, 2081px 627px #fff, 566px 1233px #fff,
    1373px 2480px #fff, 1482px 1204px #fff, 1327px 1896px #fff,
    1775px 2146px #fff, 673px 2117px #fff, 981px 770px #fff, 1139px 1421px #fff,
    1537px 1451px #fff, 633px 485px #fff, 1503px 523px #fff, 1780px 673px #fff,
    320px 976px #fff, 900px 1162px #fff, 1721px 1568px #fff, 1177px 284px #fff,
    879px 217px #fff, 2301px 2336px #fff, 59px 614px #fff, 554px 861px #fff,
    851px 1444px #fff, 2391px 516px #fff, 733px 2269px #fff, 1056px 628px #fff,
    252px 630px #fff, 1720px 1357px #fff, 1938px 1761px #fff, 1168px 2197px #fff,
    579px 1490px #fff, 1890px 1595px #fff, 2381px 1682px #fff,
    1943px 2157px #fff, 980px 2216px #fff, 1760px 1708px #fff, 371px 1178px #fff,
    358px 1741px #fff, 173px 1993px #fff, 1654px 2301px #fff, 1866px 1629px #fff,
    2164px 2431px #fff, 889px 475px #fff, 1209px 1877px #fff, 1926px 959px #fff,
    2550px 931px #fff, 1832px 1364px #fff, 723px 2209px #fff, 2323px 602px #fff,
    1199px 2049px #fff, 1612px 1788px #fff, 674px 2240px #fff,
    2524px 1269px #fff, 2049px 1584px #fff, 2494px 1650px #fff,
    1509px 368px #fff, 376px 944px #fff, 2168px 1723px #fff, 1057px 478px #fff,
    1722px 1799px #fff, 2490px 63px #fff, 668px 255px #fff, 514px 1129px #fff,
    2100px 1963px #fff, 1621px 975px #fff, 1844px 729px #fff, 837px 288px #fff,
    1725px 2267px #fff, 542px 1466px #fff, 155px 154px #fff, 856px 1097px #fff,
    876px 2056px #fff, 1448px 1961px #fff, 292px 2524px #fff, 991px 979px #fff,
    2550px 2547px #fff, 305px 2079px #fff, 687px 2344px #fff, 2226px 2359px #fff,
    2010px 197px #fff, 541px 1349px #fff, 1730px 255px #fff, 111px 1381px #fff,
    1596px 1358px #fff, 1801px 1810px #fff, 617px 798px #fff, 2525px 1926px #fff,
    1266px 1167px #fff, 602px 454px #fff, 1756px 1098px #fff, 2323px 1041px #fff,
    101px 2293px #fff, 2146px 2084px #fff, 937px 753px #fff, 510px 427px #fff,
    1999px 2474px #fff, 1740px 1001px #fff, 2472px 2245px #fff,
    2380px 554px #fff, 395px 884px #fff, 1776px 139px #fff, 799px 374px #fff,
    1831px 876px #fff, 1172px 1826px #fff, 1573px 1994px #fff,
    2318px 2461px #fff, 2152px 615px #fff, 613px 785px #fff, 1579px 1617px #fff,
    1798px 1930px #fff, 1364px 1058px #fff, 1340px 1386px #fff, 1282px 68px #fff,
    2478px 1855px #fff, 1055px 22px #fff, 1936px 2432px #fff, 608px 2406px #fff,
    169px 1357px #fff, 1336px 927px #fff, 566px 1016px #fff, 824px 1615px #fff,
    2539px 2086px #fff, 2128px 937px #fff, 410px 1971px #fff, 2309px 1515px #fff,
    2063px 300px #fff, 761px 2075px #fff, 71px 571px #fff, 791px 500px #fff,
    2201px 575px #fff, 1369px 982px #fff, 1159px 422px #fff, 1969px 108px #fff,
    1459px 1015px #fff, 1263px 1611px #fff, 966px 366px #fff, 714px 2078px #fff,
    1390px 1293px #fff, 1720px 1862px #fff, 829px 2105px #fff, 586px 678px #fff,
    1997px 1694px #fff, 918px 1692px #fff, 585px 679px #fff, 1322px 2361px #fff,
    617px 1262px #fff, 467px 750px #fff, 2297px 2136px #fff, 1065px 2001px #fff,
    1867px 279px #fff, 1583px 2380px #fff, 2315px 140px #fff, 2542px 1059px #fff,
    1160px 1136px #fff, 758px 886px #fff, 1561px 541px #fff, 2269px 75px #fff,
    569px 457px #fff, 1144px 2148px #fff, 380px 509px #fff, 1444px 966px #fff,
    158px 477px #fff, 353px 1867px #fff, 95px 1433px #fff, 1757px 525px #fff,
    1173px 2220px #fff, 1524px 227px #fff, 1073px 1118px #fff, 1030px 457px #fff,
    2001px 1120px #fff, 768px 2318px #fff, 1882px 548px #fff, 2137px 984px #fff,
    2426px 1629px #fff, 1240px 1485px #fff, 178px 1714px #fff,
    2123px 1813px #fff, 911px 1441px #fff, 1960px 942px #fff, 180px 463px #fff,
    963px 919px #fff, 2269px 2101px #fff, 2242px 1822px #fff, 2109px 1512px #fff,
    341px 1297px #fff, 2043px 414px #fff, 2030px 157px #fff, 2102px 1735px #fff,
    517px 1482px #fff, 1538px 779px #fff, 80px 491px #fff, 640px 1543px #fff,
    2218px 1984px #fff, 1924px 150px #fff, 2303px 1018px #fff, 610px 514px #fff,
    1373px 904px #fff, 2441px 1783px #fff, 1801px 1770px #fff,
    2234px 1519px #fff, 1631px 1330px #fff, 1485px 2307px #fff,
    600px 2275px #fff, 831px 709px #fff, 835px 2497px #fff, 2499px 514px #fff,
    975px 1606px #fff, 1534px 751px #fff, 707px 1974px #fff, 928px 322px #fff,
    829px 2443px #fff, 1182px 634px #fff, 1662px 1999px #fff, 500px 1937px #fff,
    1911px 1096px #fff, 1401px 627px #fff, 146px 932px #fff, 5px 81px #fff,
    2358px 2337px #fff, 1375px 2483px #fff, 1588px 2078px #fff, 749px 539px #fff,
    276px 1647px #fff, 1596px 343px #fff, 657px 1146px #fff, 816px 214px #fff,
    2131px 157px #fff, 2347px 217px #fff, 95px 941px #fff, 2370px 148px #fff,
    1734px 2505px #fff, 2557px 1994px #fff, 1594px 328px #fff,
    1154px 1900px #fff, 231px 91px #fff, 760px 1371px #fff, 548px 2260px #fff,
    340px 1077px #fff, 1114px 1249px #fff, 1848px 1032px #fff, 1490px 308px #fff,
    2417px 932px #fff, 1901px 2086px #fff, 267px 2093px #fff, 1512px 1196px #fff,
    1361px 1084px #fff, 1443px 1282px #fff, 1650px 657px #fff, 1459px 555px #fff,
    1462px 1603px #fff, 1198px 1798px #fff, 352px 904px #fff, 1183px 156px #fff,
    557px 1568px #fff, 2214px 1155px #fff, 74px 2367px #fff, 1346px 866px #fff,
    4px 561px #fff, 505px 228px #fff, 1623px 1851px #fff, 587px 1613px #fff,
    1627px 2424px #fff, 1163px 1131px #fff, 1273px 1950px #fff,
    418px 1133px #fff, 508px 1312px #fff, 1817px 194px #fff, 2283px 1026px #fff,
    2089px 1359px #fff, 1233px 1209px #fff, 275px 2482px #fff,
    2132px 1636px #fff, 1070px 564px #fff, 1529px 468px #fff, 815px 12px #fff,
    2169px 1701px #fff, 507px 1583px #fff, 1317px 832px #fff, 1732px 1970px #fff,
    730px 1405px #fff, 1103px 1974px #fff, 1586px 1021px #fff, 838px 1068px #fff,
    662px 2541px #fff, 132px 1625px #fff, 62px 783px #fff, 664px 1710px #fff,
    1093px 2337px #fff, 1945px 2543px #fff, 362px 2501px #fff, 964px 1094px #fff,
    1953px 2117px #fff, 702px 1370px #fff, 2095px 1966px #fff, 2313px 205px #fff,
    864px 1936px #fff, 506px 2369px #fff, 145px 1949px #fff, 586px 434px #fff,
    1912px 780px #fff, 2533px 921px #fff, 1675px 1335px #fff, 1915px 1466px #fff,
    610px 984px #fff, 58px 2179px #fff, 1092px 992px #fff, 1319px 2150px #fff,
    349px 197px #fff, 718px 871px #fff, 1923px 1395px #fff, 421px 183px #fff,
    2325px 2114px #fff, 923px 1075px #fff, 1577px 1428px #fff, 469px 2492px #fff,
    2216px 1967px #fff, 121px 1041px #fff, 1504px 716px #fff, 859px 1707px #fff,
    1661px 857px #fff, 1262px 331px #fff, 766px 110px #fff;
}

.stars1 {
  z-index: 10;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: transparent;
  box-shadow: 1239px 1805px #fff, 1235px 1498px #fff, 60px 2403px #fff,
    1516px 1656px #fff, 1861px 1201px #fff, 921px 710px #fff, 676px 1105px #fff,
    853px 1577px #fff, 1387px 1328px #fff, 1996px 1050px #fff, 414px 915px #fff,
    1449px 2466px #fff, 1994px 1922px #fff, 15px 1844px #fff, 853px 1902px #fff,
    2381px 1312px #fff, 253px 1966px #fff, 2317px 1429px #fff, 1980px 643px #fff,
    61px 2487px #fff, 693px 402px #fff, 417px 2472px #fff, 2048px 1513px #fff,
    2366px 1209px #fff, 256px 1px #fff, 1335px 1265px #fff, 1149px 2464px #fff,
    1634px 880px #fff, 1387px 2339px #fff, 152px 883px #fff, 94px 566px #fff,
    822px 345px #fff, 205px 2312px #fff, 1855px 1999px #fff, 1081px 1863px #fff,
    2047px 1331px #fff, 947px 1916px #fff, 2440px 1093px #fff, 574px 676px #fff,
    556px 991px #fff, 2218px 1617px #fff, 830px 2427px #fff, 2316px 1719px #fff,
    2032px 1761px #fff, 1633px 2366px #fff, 140px 1675px #fff, 374px 1510px #fff,
    1668px 229px #fff, 1122px 217px #fff, 555px 703px #fff, 461px 866px #fff,
    207px 47px #fff, 2015px 1977px #fff, 2196px 275px #fff, 2011px 1608px #fff,
    1300px 610px #fff, 220px 743px #fff, 294px 462px #fff, 1233px 1485px #fff,
    1772px 1726px #fff, 2498px 218px #fff, 1399px 1634px #fff,
    1956px 2502px #fff, 921px 2466px #fff, 2043px 2288px #fff, 948px 500px #fff,
    874px 2017px #fff, 737px 367px #fff, 1561px 726px #fff, 2482px 1909px #fff,
    1718px 2374px #fff, 2009px 394px #fff, 2180px 1663px #fff, 428px 1235px #fff,
    2387px 1734px #fff, 1453px 270px #fff, 1358px 2252px #fff, 470px 285px #fff,
    1301px 817px #fff, 1036px 1641px #fff, 280px 1535px #fff, 400px 2252px #fff,
    1214px 1232px #fff, 1216px 1895px #fff, 908px 834px #fff, 1436px 119px #fff,
    586px 1229px #fff, 1879px 2033px #fff, 14px 219px #fff, 1253px 1802px #fff,
    1805px 1785px #fff, 832px 746px #fff, 1620px 1851px #fff, 192px 678px #fff,
    2158px 1314px #fff, 2273px 802px #fff, 57px 1021px #fff, 1334px 1393px #fff,
    2366px 2091px #fff, 732px 828px #fff, 1359px 2130px #fff, 799px 2270px #fff,
    1039px 2135px #fff, 1230px 1622px #fff, 257px 139px #fff, 1493px 404px #fff,
    1550px 68px #fff, 2213px 2px #fff, 34px 153px #fff, 1648px 174px #fff,
    1717px 1089px #fff, 1892px 2254px #fff, 1258px 564px #fff, 576px 518px #fff,
    1952px 817px #fff, 372px 1288px #fff, 1887px 2056px #fff, 2150px 728px #fff,
    2527px 1036px #fff, 1432px 1910px #fff, 1977px 1906px #fff,
    1895px 1098px #fff, 2476px 1734px #fff, 1339px 760px #fff, 1623px 302px #fff,
    1386px 750px #fff, 338px 1850px #fff, 1141px 1909px #fff, 249px 576px #fff,
    2156px 1349px #fff, 1178px 1038px #fff, 1046px 475px #fff,
    1544px 1935px #fff, 2480px 562px #fff, 1310px 2143px #fff, 450px 992px #fff,
    1771px 1553px #fff, 164px 329px #fff, 1427px 2093px #fff, 478px 1112px #fff,
    321px 1623px #fff, 1874px 2px #fff, 728px 923px #fff, 2304px 340px #fff,
    2313px 31px #fff, 142px 1248px #fff, 1341px 1926px #fff, 1104px 1019px #fff,
    232px 1823px #fff, 2179px 2066px #fff, 243px 2022px #fff, 1788px 1214px #fff,
    1917px 1692px #fff, 787px 1692px #fff, 551px 2539px #fff, 1501px 1398px #fff,
    1480px 1366px #fff, 489px 1021px #fff, 484px 1028px #fff, 1155px 29px #fff,
    231px 402px #fff, 531px 2311px #fff, 479px 174px #fff, 1283px 2474px #fff,
    17px 1173px #fff, 158px 1787px #fff, 2202px 1785px #fff, 1342px 2415px #fff,
    1148px 1362px #fff, 184px 1744px #fff;
  animation: animStar 125s linear infinite;
}
.stars1:after {
  content: " ";
  top: -600px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  position: absolute;
  backgroud: transparent;
  box-shadow: 869px 97px #fff, 1255px 135px #fff, 146px 109px #fff,
    1848px 619px #fff, 561px 1816px #fff, 1418px 587px #fff, 459px 698px #fff,
    1925px 1306px #fff, 2137px 265px #fff, 2418px 1919px #fff,
    2277px 1473px #fff, 752px 2528px #fff, 1022px 705px #fff, 1056px 1969px #fff,
    945px 1058px #fff, 651px 783px #fff, 688px 2229px #fff, 1821px 1140px #fff,
    503px 2150px #fff, 1028px 1889px #fff, 581px 384px #fff, 1823px 2382px #fff,
    2307px 1942px #fff, 701px 552px #fff, 303px 2241px #fff, 1436px 1136px #fff,
    616px 1097px #fff, 416px 840px #fff, 496px 765px #fff, 2508px 2120px #fff,
    2316px 2033px #fff, 1171px 1400px #fff, 1308px 1052px #fff,
    492px 2024px #fff, 158px 1268px #fff, 1827px 132px #fff, 2545px 1248px #fff,
    617px 1875px #fff, 620px 1788px #fff, 1902px 2496px #fff, 2012px 1475px #fff,
    996px 1253px #fff, 2228px 1452px #fff, 2196px 406px #fff, 801px 325px #fff,
    47px 235px #fff, 176px 1769px #fff, 456px 1918px #fff, 1690px 1073px #fff,
    1131px 705px #fff, 1345px 1225px #fff, 808px 428px #fff, 1850px 2358px #fff,
    2363px 1421px #fff, 2312px 45px #fff, 1315px 2223px #fff, 439px 1160px #fff,
    1465px 1700px #fff, 2519px 1127px #fff, 996px 1314px #fff, 860px 1026px #fff,
    371px 1755px #fff, 2286px 411px #fff, 2101px 1509px #fff, 2041px 100px #fff,
    43px 1952px #fff, 562px 600px #fff, 1833px 2416px #fff, 1827px 1722px #fff,
    1750px 63px #fff, 1791px 2020px #fff, 633px 1375px #fff, 592px 2111px #fff,
    280px 513px #fff, 2410px 1987px #fff, 1880px 806px #fff, 2528px 2433px #fff,
    1588px 1164px #fff, 1614px 394px #fff, 964px 172px #fff, 2423px 470px #fff,
    375px 296px #fff, 560px 1997px #fff, 750px 1049px #fff, 1839px 891px #fff,
    1262px 95px #fff, 2316px 1136px #fff, 135px 1563px #fff, 1564px 1974px #fff,
    574px 1187px #fff, 2322px 2001px #fff, 2338px 1239px #fff,
    2544px 2415px #fff, 594px 115px #fff, 855px 1506px #fff, 1485px 796px #fff,
    1350px 2484px #fff, 443px 2244px #fff, 1203px 868px #fff, 1774px 1452px #fff,
    9px 1737px #fff, 603px 2478px #fff, 364px 2466px #fff, 1093px 518px #fff,
    825px 2494px #fff, 520px 1333px #fff, 1786px 212px #fff, 2245px 933px #fff,
    644px 2428px #fff, 2283px 818px #fff, 801px 983px #fff, 1387px 2250px #fff,
    941px 2536px #fff, 2505px 1219px #fff, 1523px 675px #fff, 1097px 794px #fff,
    1854px 1674px #fff, 2327px 460px #fff, 1770px 364px #fff, 1423px 1260px #fff,
    744px 895px #fff, 2444px 1928px #fff, 307px 1985px #fff, 722px 1184px #fff,
    1179px 8px #fff, 479px 1790px #fff, 909px 2070px #fff, 1479px 88px #fff,
    1613px 2191px #fff, 818px 2088px #fff, 1115px 2381px #fff,
    1176px 1439px #fff, 1434px 1752px #fff, 1061px 1855px #fff,
    1741px 1582px #fff, 1789px 1975px #fff, 85px 1545px #fff, 291px 1772px #fff,
    418px 1263px #fff, 2319px 846px #fff, 1835px 1907px #fff, 238px 2029px #fff,
    233px 329px #fff, 222px 1254px #fff, 1117px 2454px #fff, 1677px 1285px #fff,
    2094px 727px #fff, 1345px 174px #fff, 809px 1010px #fff, 966px 1933px #fff,
    944px 2002px #fff, 1321px 297px #fff, 1209px 897px #fff, 572px 53px #fff,
    839px 2381px #fff, 344px 2181px #fff, 1206px 2549px #fff, 648px 159px #fff,
    1061px 614px #fff, 94px 1770px #fff, 635px 688px #fff, 819px 11px #fff,
    1730px 1817px #fff, 1835px 1943px #fff, 1283px 637px #fff, 578px 671px #fff,
    1534px 210px #fff, 1142px 1925px #fff, 565px 2273px #fff, 1729px 2350px #fff;
}

.stars2 {
  z-index: 10;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: transparent;
  box-shadow: 1196px 902px #fff, 2021px 2351px #fff, 984px 1748px #fff,
    909px 1027px #fff, 1624px 2267px #fff, 575px 2353px #fff, 160px 1982px #fff,
    327px 102px #fff, 249px 1267px #fff, 1498px 2244px #fff, 2151px 820px #fff,
    709px 1751px #fff, 1150px 1981px #fff, 2370px 1667px #fff,
    1773px 1552px #fff, 2175px 2332px #fff, 1253px 2472px #fff,
    1855px 321px #fff, 1478px 1362px #fff, 2395px 2470px #fff, 72px 2098px #fff,
    592px 1189px #fff, 2499px 1337px #fff, 1581px 1164px #fff,
    2083px 2316px #fff, 597px 820px #fff, 302px 1188px #fff, 596px 572px #fff,
    1379px 260px #fff, 1566px 1246px #fff, 438px 1284px #fff, 96px 276px #fff,
    308px 399px #fff, 1012px 2414px #fff, 2474px 1204px #fff, 986px 664px #fff,
    179px 1422px #fff, 2374px 947px #fff, 394px 967px #fff, 277px 1346px #fff,
    104px 1797px #fff, 872px 805px #fff, 1954px 1606px #fff, 2113px 141px #fff,
    453px 2454px #fff, 353px 1538px #fff, 1958px 3px #fff, 48px 2471px #fff,
    469px 56px #fff, 1947px 1459px #fff;
  animation: animStar 175s linear infinite;
}
.stars2:after {
  content: " ";
  top: -600px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  position: absolute;
  backgroud: transparent;
  box-shadow: 174px 1142px #fff, 725px 1727px #fff, 788px 1102px #fff,
    2261px 284px #fff, 1914px 185px #fff, 1912px 297px #fff, 65px 453px #fff,
    1351px 1809px #fff, 621px 1203px #fff, 2001px 2209px #fff,
    1907px 2176px #fff, 1322px 176px #fff, 728px 833px #fff, 72px 1041px #fff,
    1589px 2082px #fff, 44px 39px #fff, 1670px 1026px #fff, 1390px 641px #fff,
    1269px 249px #fff, 1358px 500px #fff, 1841px 2292px #fff, 1347px 553px #fff,
    885px 2451px #fff, 1235px 129px #fff, 367px 221px #fff, 2361px 978px #fff,
    2070px 457px #fff, 439px 2113px #fff, 231px 142px #fff, 1956px 928px #fff,
    1363px 1353px #fff, 1029px 2344px #fff, 18px 910px #fff, 970px 837px #fff,
    1320px 753px #fff, 998px 1078px #fff, 571px 2534px #fff, 9px 91px #fff,
    470px 1728px #fff, 918px 1985px #fff, 2486px 629px #fff, 2172px 465px #fff,
    943px 1821px #fff, 214px 2500px #fff, 1816px 712px #fff, 2542px 1650px #fff,
    1793px 63px #fff, 1340px 1646px #fff, 2489px 1632px #fff, 1428px 1693px #fff;
}

@keyframes animStar {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-2560px) translateX(-2560px);
  }
}
</style>