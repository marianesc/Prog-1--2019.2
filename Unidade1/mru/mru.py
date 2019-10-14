#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#MRU

posicao_inicial = float(input())
velocidade = float(input())
tempo = float(input())

posicao_final = posicao_inicial + (velocidade*tempo)

print ("Posição final do móvel")
print ("S(%.1f) = %.1f m" % (tempo, posicao_final))

