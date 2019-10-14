# UFCG - Programção 1 - 2019.2
# André Lucas Medeiros Martins - 119210592
# Categoria

nome=input()
idade=int(input())

if idade <= 4:
    categoria = "Não pode competir."

elif idade >= 5 and idade <= 7:
    categoria = "Infantil A."

elif idade >= 8 and idade <= 10:
    categoria = "Infantil B."

elif idade >= 11 and idade <= 13:
    categoria = "Juvenil A."

elif idade >= 14 and idade <= 17:
    categoria = "Juvenil B."

else:
    categoria = "Senior."

print("{}, {} anos, {}".format(nome, idade, categoria))

