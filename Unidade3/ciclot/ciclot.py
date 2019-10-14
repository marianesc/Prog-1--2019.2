#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Ciclo Trig.

angulo = int(input())
volta =  angulo//360
if angulo >= 361:
    angulo = angulo -(360*volta)

if angulo == 0 or angulo == 90 or angulo == 180 or angulo == 270:
    print("Sobre eixos")
elif angulo > 0 and angulo < 90:
    print("Quadrante 1")
elif angulo > 90 and angulo < 180:
    print("Quadrante 2")
elif angulo > 180 and angulo < 270:
    print("Quadrante 3")
elif angulo > 270 and angulo < 360:
    print("Quadrante 4")
