#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Imprime Nota Fiscal

valor_total = float(input())
data = input()
quantidade_de_produtos = float(input())

media = valor_total / quantidade_de_produtos

print ("Data:",data)
print ('O valor total da compra foi de R$ %0.2f. A média do preço dos produtos é de %1.1f.'%(valor_total,media))

