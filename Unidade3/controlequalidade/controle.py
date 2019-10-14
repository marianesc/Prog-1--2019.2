#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Controle de Qualidade

inicial = float(input())
final = float(input())

agua = inicial-final
aguap = (final*100)/inicial
produto = 100-aguap
produto10 = inicial *0.10


print("{0:.1f}% do peso do produto é de água congelada.".format(produto))

if agua >= (inicial*0.10):
    print("Produto não conforme.")
elif agua < (inicial*0.05):
    print("Produto qualis A.")
else:
    print("Produto em conformidade.")
