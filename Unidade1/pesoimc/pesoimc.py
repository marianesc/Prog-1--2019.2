#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Peso e IMC


peso = float(input())
altura = float(input())

imc = peso / altura ** 2
pesoi = (peso*24.9)/imc
ideal = pesoi-peso 

print ("IMC atual = %.2f"%imc)
print ("Peso a ser ganho/perdido = %.2f" % ideal)
