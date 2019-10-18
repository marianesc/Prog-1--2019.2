# coding: utf-8
import unittest
import sys

undertest = __import__(sys.argv[-1].split(".py")[0])
time_campeao = getattr(undertest, 'time_campeao', None)

class PublicTests(unittest.TestCase):
    
    def test_1(self):
        dados = {"Botafogo": [59, 43, 39], "São Paulo": [52, 44, 36], "Palmeiras": [80, 62, 32], "Santos": [72, 59, 35]}

        assert time_campeao(dados) == ["Palmeiras"]

if __name__ == '__main__':
    loader = unittest.TestLoader()
    runner = unittest.TextTestRunner()
    runner.run(loader.loadTestsFromModule(sys.modules[__name__]))
