# UFCG - Programação 1 - 2019.2
# André Lucas Medeiros Martins - 119210592
# Controle de Qualidade

pesoAntes = float(input())
pesoAgua = pesoAntes - float(input())

porcentagem = pesoAgua/pesoAntes*100

print("{:.1f}% do peso do produto é de água congelada.".format(porcentagem))

if porcentagem < 5:
    print("Produto qualis A.")
elif porcentagem >= 5 and porcentagem < 10:
    print("Produto em conformidade.")
else:
    print("Produto não conforme.")


