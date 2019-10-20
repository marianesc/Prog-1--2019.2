#Leonardo Su 17:15 16/10/2019
# coding: utf-8
def maior(dados):
	maximo = 0
	for e in dados.keys():
		if maximo < dados[e][0]:
			maximo = dados[e][0]

	return maximo

def time_campeao(dados):
	pontos = maior(dados)
	candidatos = []

	for time in dados.keys():
		if dados[time][0] == pontos:
			candidatos.append(time)

	return candidatos



dados = {"Botafogo": [59, 43, 39],
    "São Paulo": [52, 44, 36],
    "Palmeiras": [80, 62, 32],
    "Santos": [72, 59, 35]}

# dados ={
# 		"Botafogo": [100000000000, 43, 39],
#     	"São Paulo": [52, 44, 36],
#     	"Palmeiras": [80, 62, 32],
#     	"Santos": [72, 59, 35]}
# print(time_campeao(dados))

assert time_campeao(dados) == ["Palmeiras"]