#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Nota na Final

print ("== Estágio 1 ==")
peso1 = float(input("Peso? "))
nota1 = float(input("Nota? "))
print ("== Estágio 2 ==")
peso2 = float(input("Peso? "))
nota2 = float(input("Nota? "))
print ("== Estágio 3 ==")
peso3 = float(input("Peso? "))
nota3 = float(input("Nota? "))

mediap = ((nota1*peso1)+(nota2*peso2)+(nota3*peso3))/(peso1+peso2+peso3)
notafinal5 = (5-(mediap*0.6))/0.4
notafinal7 = (7-(mediap*0.6))/0.4


print("== Resultados ==")
print("Média parcial: %.1f" % mediap)
print("Nota na final, pra média 5.0 = %.1f"%notafinal5)
print("Nota na final, pra média 7.0 = %.1f"%notafinal7)
