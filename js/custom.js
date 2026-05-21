document.addEventListener("DOMContentLoaded", function () {
	var currentYear = document.getElementById("current-year");
	var navToggle = document.querySelector(".nav-toggle");
	var navLinks = document.querySelector(".nav-links");
	var links = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
	var sections = links
		.map(function (link) {
			var target = document.querySelector(link.getAttribute("href"));
			return target ? { link: link, target: target } : null;
		})
		.filter(Boolean);

	if (currentYear) {
		currentYear.textContent = new Date().getFullYear();
	}

	if (navToggle && navLinks) {
		navToggle.addEventListener("click", function () {
			var isOpen = navLinks.classList.toggle("is-open");
			document.body.classList.toggle("nav-open", isOpen);
			navToggle.setAttribute("aria-expanded", String(isOpen));
		});

		links.forEach(function (link) {
			link.addEventListener("click", function () {
				navLinks.classList.remove("is-open");
				document.body.classList.remove("nav-open");
				navToggle.setAttribute("aria-expanded", "false");
			});
		});
	}

	if ("IntersectionObserver" in window) {
		var revealObserver = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-visible");
						revealObserver.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.14 }
		);

		document.querySelectorAll(".reveal").forEach(function (element) {
			revealObserver.observe(element);
		});

		var navObserver = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (!entry.isIntersecting) {
						return;
					}

					sections.forEach(function (item) {
						item.link.classList.toggle("is-active", item.target === entry.target);
					});
				});
			},
			{
				rootMargin: "-35% 0px -55% 0px",
				threshold: 0
			}
		);

		sections.forEach(function (item) {
			navObserver.observe(item.target);
		});
	} else {
		document.querySelectorAll(".reveal").forEach(function (element) {
			element.classList.add("is-visible");
		});
	}
});
