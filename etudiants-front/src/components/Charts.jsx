"use client"

import { useEffect, useRef } from "react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { gsap } from "gsap"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const Charts = ({ stats }) => {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  const data = {
    labels: ["Moyenne de classe", "Moyenne minimale", "Moyenne maximale"],
    datasets: [
      {
        label: "Performances",
        data: [stats.moyenneClasse, stats.moyenneMin, stats.moyenneMax],
        backgroundColor: ["rgba(54, 162, 235, 0.5)", "rgba(255, 99, 132, 0.5)", "rgba(75, 192, 192, 0.5)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false, // Désactiver l'animation par défaut pour utiliser GSAP
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Statistiques des moyennes",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 20,
      },
    },
  }

  useEffect(() => {
    // Attendre que le chart soit rendu
    if (chartRef.current) {
      // Stocker l'instance du chart
      chartInstance.current = chartRef.current

      // Animer les barres avec GSAP
      const barElements = chartInstance.current.canvas.parentNode.querySelectorAll(
        ".chartjs-render-monitor + div canvas",
      )

      if (barElements.length === 0) {
        // Si on ne peut pas trouver les éléments spécifiques, on anime le canvas entier
        const canvas = chartInstance.current.canvas

        // Animation d'entrée
        gsap.fromTo(
          canvas,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
          },
        )

        // Animation des données
        const ctx = canvas.getContext("2d")
        const originalDraw = chartInstance.current.draw

        chartInstance.current.draw = function () {
          originalDraw.apply(this, arguments)

          // Ajouter un effet de brillance
          gsap.to(canvas, {
            duration: 0.5,
            boxShadow: "0 0 10px rgba(0,123,255,0.5)",
            yoyo: true,
            repeat: 1,
          })
        }
      } else {
        // Animation des barres individuelles si on peut les trouver
        gsap.from(barElements, {
          scaleY: 0,
          transformOrigin: "bottom",
          stagger: 0.2,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
        })
      }
    }
  }, [stats]) // Réexécuter quand les stats changent

  return (
    <div
      style={{
        marginTop: "20px",
        height: "400px",
        position: "relative",
        transition: "all 0.3s ease",
      }}
    >
      <Bar ref={chartRef} data={data} options={options} />
    </div>
  )
}

export default Charts

