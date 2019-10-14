#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Aprovação em Unidades

unidade = int(input('Unidade? '))
media = float(input('Média de aprovação na unidade? '))

proxima_unidade = unidade + 1
msg = ('\nO aluno vai para a unidade %d com média %.1f.')

print (msg %(proxima_unidade, media))
