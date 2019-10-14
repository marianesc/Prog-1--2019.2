#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Tinta

altura = float(input())
largura = float(input())

parede = altura*largura
tinta_parede = parede/50
tinta = tinta_parede*3.6

print("{0:.2f} l".format(tinta))

