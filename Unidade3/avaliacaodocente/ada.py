#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Avaliação de Desempenho Acadêmico

sm = int(input())
ensino = int(input())
intele = int(input())
orientacao = int(input())
administrativa = input()

adm = int(administrativa)

media = (ensino+intele+orientacao+adm)/4

if sm < 4:
    print("Promoção indeferida. Número de semestres insuficiente.")
elif ensino < 320:
    print("Promoção indeferida. Pontuação mínima não alcançada.")
elif intele < 100:
    print("Promoção indeferida. Pontuação mínima não alcançada.")
elif orientacao < 20:
    print("Promoção indeferida. Pontuação mínima não alcançada.")
elif media < 140:
    print("Promoção indeferida. Média insuficiente.")
else:
    print("Promoção deferida. Parabéns!")
