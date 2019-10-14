# UFCG - Programação 1 - 2019.2
# André Lucas Medeiros Martins - 119210592
# Segundo Maior e Segundo Menor

numero1 = int(input())

maior = numero1
menor = numero1

numero2 = int(input())

if numero2 >= maior:
    maior = numero2
else:
    menor = numero2

numero3 = int(input())
    
if numero3 >= maior:
    segundoMaior = maior
    segundoMenor = maior
    maior = numero3

elif numero3 >= menor and menor <= maior:
    segundoMaior = numero3
    segundoMenor = numero3

else:
    segundoMaior = menor
    segundoMenor = menor
    menor = numero3

numero4=int(input())

if numero4 >= maior:
    segundoMaior = maior
    maior = numero4

elif numero4 <= maior and numero4 >= segundoMaior:
    segundoMaior = numero4

elif numero4 <= segundoMaior and numero4 >= menor:
    segundoMenor=numero4

else:
    segundoMenor = menor
    menor = numero4

print('Considerando os números {}, {}, {} e {}'.format(numero1, numero2, numero3, numero4))
print("O segundo menor número é {}".format(segundoMenor))
print("O segundo maior número é {}".format(segundoMaior))
