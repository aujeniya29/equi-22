# Story 4.1: Contact Form Component with Web3Forms Integration

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **visitor**,
I want **to submit a contact inquiry via a form that adapts to the context of the page I'm on**,
so that **the center receives my question with the right context and can respond quickly** (FR13, FR14).

## Acceptance Criteria

1. **AC-1: Variant system** — `ContactForm.astro` accepts a `variant` prop typed as `'generic' | 'cours' | 'pension' | 'evenement'` defaulting to `'generic'`. The component renders different field combinations based on the variant (see AC-2 through AC-5).

2. **AC-2: Generic variant fields** — Fields rendered for `variant="generic"`: Prénom (text, required), Téléphone (tel, required), Message (textarea, required). A `"* Obligatoire"` note appears at the top.

3. **AC-3: Cours variant fields** — All generic fields PLUS: Âge de l'enfant (text, optional). The optional field has no asterisk and its absence does not block submission.

4. **AC-4: Pension variant fields** — All generic fields PLUS: Type d'équidé (select with options: Poney / Cheval, optional). No asterisk on this field.

5. **AC-5: Événement variant fields** — All generic fields PLUS: Type d'événement (select: Anniversaire poney / Sortie scolaire / Team-building / Autre, required *), Date souhaitée (text, required *), Nombre de participants (number, required *). All three added fields are required.

6. **AC-6: Labels & accessibility** — Every field has a `<label>` element with `for` attribute matching the input `id`. Labels are always displayed above the field — never replaced by placeholder. Required fields show asterisk (`*`) in the label. Each field with possible errors has `aria-describedby` pointing to its error `<p>` element. All `<p>` error messages have `role="alert"`.

7. **AC-7: Honeypot spam protection** — A hidden `<input type="checkbox" name="botcheck">` is present in the form, hidden with `style="display:none;"` CSS and `tabindex="-1"` and `aria-hidden="true"` attributes (NFR9). Real users never see or interact with it.

8. **AC-8: Blur validation** — When a visitor leaves a required field (`blur` event): if valid, the field gets `input-success` / `textarea-success` / `select-success` daisyUI class; if invalid, it gets `input-error` / `textarea-error` / `select-error` class and a human-friendly French error message appears below (`<p>` becomes visible). Examples: `"Merci d'indiquer votre prénom."`, `"Merci d'indiquer votre numéro de téléphone pour qu'on puisse vous rappeler."`, `"Merci d'écrire votre message."`.

9. **AC-9: All-fields validation on submit** — When the visitor clicks submit, ALL required fields are validated. If any are invalid, validation state is shown and submission is blocked. The submit button is disabled and shows a loading state ("Envoi en cours…") during the async request.

10. **AC-10: Web3Forms POST** — On submit (all valid), the form sends a `fetch()` POST to `https://api.web3forms.com/submit` using `FormData` (which includes the `access_key` hidden input rendered server-side from `import.meta.env.WEB3FORMS_KEY`). No data is stored server-side beyond forwarding (NFR10). The center manager receives an email notification immediately (FR14).

11. **AC-11: Success state** — On successful submission (`data.success === true`): the form is hidden (`.hidden` class) and an inline success message is shown: `"Merci ! On vous rappelle dans les 24h."` in a daisyUI `alert alert-success` element with `role="status"` and `aria-live="polite"`.

12. **AC-12: Error state** — On submission failure (network error or `data.success === false`): the submit button is re-enabled, and an inline error message shows: `"Une erreur s'est produite. Merci de réessayer ou de nous appeler directement."` in a `alert alert-error` with `role="alert"` and `aria-live="polite"`.

13. **AC-13: Keyboard accessibility** — The form is fully navigable and operable via keyboard. All interactive elements are reachable via Tab. Submit is possible via Enter on buttons. Focus order follows visual order.

14. **AC-14: No regression** — No existing `.astro` components or pages are modified. `astro check` passes with 0 errors. `npm run build` completes successfully.

## Tasks / Subtasks

- [x] Task 1: Create `ContactForm.astro` with all variants and static structure (AC: #1–7)
  - [x] Define `interface Props { variant?: 'generic' | 'cours' | 'pension' | 'evenement'; }`
  - [x] Read `import.meta.env.WEB3FORMS_KEY` in frontmatter, assign to `accessKey`
  - [x] Render hidden inputs: `access_key` (value={accessKey}), `subject`, `from_name`, `botcheck`
  - [x] Render generic fields: Prénom, Téléphone, Message — all with `<label>`, `id`, `aria-describedby`, hidden error `<p>`
  - [x] Conditionally render `cours` extra field (Âge de l'enfant)
  - [x] Conditionally render `pension` extra field (Type d'équidé select)
  - [x] Conditionally render `evenement` extra fields (Type, Date, Nb participants) — all required
  - [x] Add submit button + hidden success alert + hidden error alert

- [x] Task 2: Add client-side `<script>` for blur validation (AC: #8)
  - [x] Select all form instances via `[data-contact-form]` attribute
  - [x] For each form, attach `blur` listener to all non-hidden inputs, textareas, selects
  - [x] `validateField()` helper: if required + empty → `input-error` + show error `<p>`; else → `input-success` + hide error `<p>`
  - [x] Handle `<select>` separately (uses `select-error`/`select-success`), `<textarea>` separately (uses `textarea-error`/`textarea-success`)

- [x] Task 3: Add client-side `<script>` for Web3Forms submission (AC: #9–12)
  - [x] Attach `submit` event listener (prevent default)
  - [x] Validate all required fields on submit — halt if any invalid
  - [x] Disable submit button, set text to "Envoi en cours…"
  - [x] `const data = new FormData(form)` — includes `access_key` from hidden input automatically
  - [x] `fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })` in try/catch
  - [x] On `data.success === true`: hide form, show success alert
  - [x] On failure or `data.success === false`: re-enable button, show error alert

- [x] Task 4: Build verification (AC: #14)
  - [x] Run `astro check` — confirm 0 type errors
  - [x] Run `npm run build` — confirm successful build
  - [x] Verify no regression on existing pages

## Dev Notes

### Critical Context — Current Codebase State

**Component count before this story:** 12 components in `src/components/`:
```
Footer.astro, Hero.astro, Navbar.astro, NewsCard.astro, PlanningBlock.astro,
PricingTable.astro, ProfileRouting.astro, SchemaMarkup.astro, ServiceCard.astro,
ServicePage.astro, StickyContact.astro, Testimonial.astro
```
Adding `ContactForm.astro` → **13 components** — still under the 15-component subfolder threshold. No subfolders in `components/`.

**This story creates ONLY the component.** No page uses it yet. Story 4.2 creates the `/contact` page and embeds `<ContactForm variant="generic" />`. Service pages may embed it in future stories (out of scope here).

**Environment variable:** `.env.example` already documents `WEB3FORMS_KEY=your-web3forms-key`. The actual key is set in `.env` locally and in Cloudflare Pages dashboard for production. If `WEB3FORMS_KEY` is not set, `import.meta.env.WEB3FORMS_KEY` returns `undefined` — handled with `?? ''` fallback.

**Web3Forms API:** POST to `https://api.web3forms.com/submit` with `FormData`. Required field: `access_key`. The honeypot field name is `botcheck` (Web3Forms standard). Response: `{ success: boolean, message: string }`. No CORS issues — Web3Forms supports browser `fetch()` natively. The `access_key` embedded in HTML is **intentional** (Web3Forms client-side design) — the key is non-sensitive and can be regenerated if misused.

**Why NOT `action=` attribute form submit:** Traditional HTML form POST navigates the page. The AC requires inline success/error messages without page navigation — therefore `fetch()` is mandatory. The form uses `novalidate` attribute to disable native browser validation (we handle it ourselves with better UX).

**Why `define:vars` is NOT needed:** The `access_key` is embedded in a hidden `<input>` rendered at build time. `new FormData(form)` automatically includes it. No need to pass it to the script separately.

**Astro `<script>` behavior:** Astro deduplicates module scripts — if `ContactForm.astro` is used on multiple pages, the `<script>` is bundled once per page. Within a single page, the script runs once and must handle multiple form instances via `querySelectorAll('[data-contact-form]')`.

---

### Complete Implementation — `src/components/ContactForm.astro`

Create `src/components/ContactForm.astro`:

```astro
---
interface Props {
  variant?: 'generic' | 'cours' | 'pension' | 'evenement';
}

const { variant = 'generic' } = Astro.props;
const accessKey = import.meta.env.WEB3FORMS_KEY ?? '';
---

<div data-contact-form class="w-full">
  <p class="text-sm text-base-content/60 mb-6">* Obligatoire</p>

  <form class="flex flex-col gap-5" novalidate>
    <!-- Web3Forms required hidden fields -->
    <input type="hidden" name="access_key" value={accessKey} />
    <input type="hidden" name="subject" value="Nouvelle demande de contact — Équi 22" />
    <input type="hidden" name="from_name" value="Équi 22 Site Web" />
    <!-- Honeypot: hidden from real users, traps bots -->
    <input
      type="checkbox"
      name="botcheck"
      style="display:none;"
      tabindex="-1"
      aria-hidden="true"
    />

    <!-- Prénom (required, all variants) -->
    <div class="form-control">
      <label class="label pb-1" for="contact-prenom">
        <span class="label-text font-medium">Prénom *</span>
      </label>
      <input
        type="text"
        id="contact-prenom"
        name="prenom"
        class="input input-bordered w-full"
        required
        autocomplete="given-name"
        aria-describedby="contact-prenom-error"
      />
      <p id="contact-prenom-error" class="text-error text-sm mt-1 hidden" role="alert">
        Merci d'indiquer votre prénom.
      </p>
    </div>

    <!-- Téléphone (required, all variants) -->
    <div class="form-control">
      <label class="label pb-1" for="contact-telephone">
        <span class="label-text font-medium">Téléphone *</span>
      </label>
      <input
        type="tel"
        id="contact-telephone"
        name="telephone"
        class="input input-bordered w-full"
        required
        autocomplete="tel"
        aria-describedby="contact-telephone-error"
      />
      <p id="contact-telephone-error" class="text-error text-sm mt-1 hidden" role="alert">
        Merci d'indiquer votre numéro de téléphone pour qu'on puisse vous rappeler.
      </p>
    </div>

    <!-- Cours variant: Âge de l'enfant (optional) -->
    {variant === 'cours' && (
      <div class="form-control">
        <label class="label pb-1" for="contact-age-enfant">
          <span class="label-text font-medium">Âge de l'enfant</span>
        </label>
        <input
          type="text"
          id="contact-age-enfant"
          name="age_enfant"
          class="input input-bordered w-full"
          placeholder="ex : 8 ans"
          autocomplete="off"
        />
      </div>
    )}

    <!-- Pension variant: Type d'équidé (optional select) -->
    {variant === 'pension' && (
      <div class="form-control">
        <label class="label pb-1" for="contact-type-equide">
          <span class="label-text font-medium">Type d'équidé</span>
        </label>
        <select
          id="contact-type-equide"
          name="type_equide"
          class="select select-bordered w-full"
        >
          <option value="">— Sélectionner —</option>
          <option value="poney">Poney</option>
          <option value="cheval">Cheval</option>
        </select>
      </div>
    )}

    <!-- Événement variant: 3 required extra fields -->
    {variant === 'evenement' && (
      <>
        <div class="form-control">
          <label class="label pb-1" for="contact-type-evenement">
            <span class="label-text font-medium">Type d'événement *</span>
          </label>
          <select
            id="contact-type-evenement"
            name="type_evenement"
            class="select select-bordered w-full"
            required
            aria-describedby="contact-type-evenement-error"
          >
            <option value="">— Sélectionner —</option>
            <option value="anniversaire">Anniversaire poney</option>
            <option value="scolaire">Sortie scolaire</option>
            <option value="team-building">Team-building</option>
            <option value="autre">Autre</option>
          </select>
          <p id="contact-type-evenement-error" class="text-error text-sm mt-1 hidden" role="alert">
            Merci de sélectionner un type d'événement.
          </p>
        </div>

        <div class="form-control">
          <label class="label pb-1" for="contact-date-souhaitee">
            <span class="label-text font-medium">Date souhaitée *</span>
          </label>
          <input
            type="text"
            id="contact-date-souhaitee"
            name="date_souhaitee"
            class="input input-bordered w-full"
            placeholder="ex : juin 2026"
            required
            aria-describedby="contact-date-souhaitee-error"
          />
          <p id="contact-date-souhaitee-error" class="text-error text-sm mt-1 hidden" role="alert">
            Merci d'indiquer une date souhaitée.
          </p>
        </div>

        <div class="form-control">
          <label class="label pb-1" for="contact-nb-participants">
            <span class="label-text font-medium">Nombre de participants *</span>
          </label>
          <input
            type="number"
            id="contact-nb-participants"
            name="nb_participants"
            class="input input-bordered w-full"
            min="1"
            required
            aria-describedby="contact-nb-participants-error"
          />
          <p id="contact-nb-participants-error" class="text-error text-sm mt-1 hidden" role="alert">
            Merci d'indiquer le nombre de participants.
          </p>
        </div>
      </>
    )}

    <!-- Message (required, all variants) -->
    <div class="form-control">
      <label class="label pb-1" for="contact-message">
        <span class="label-text font-medium">Message *</span>
      </label>
      <textarea
        id="contact-message"
        name="message"
        class="textarea textarea-bordered w-full min-h-[120px]"
        required
        aria-describedby="contact-message-error"
      ></textarea>
      <p id="contact-message-error" class="text-error text-sm mt-1 hidden" role="alert">
        Merci d'écrire votre message.
      </p>
    </div>

    <!-- Submit button -->
    <div>
      <button
        type="submit"
        class="contact-submit-btn btn btn-primary w-full sm:w-auto min-h-[44px]"
      >
        Envoyer ma demande
      </button>
    </div>

    <!-- Success alert (shown after successful submission) -->
    <div
      class="contact-success alert alert-success hidden"
      role="status"
      aria-live="polite"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>Merci ! On vous rappelle dans les 24h.</span>
    </div>

    <!-- Error alert (shown on submission failure) -->
    <div
      class="contact-error-msg alert alert-error hidden"
      role="alert"
      aria-live="polite"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>Une erreur s'est produite. Merci de réessayer ou de nous appeler directement.</span>
    </div>
  </form>
</div>

<script>
  // Handles all ContactForm instances on the page (deduped by Astro module bundler)
  document.querySelectorAll<HTMLElement>('[data-contact-form]').forEach((wrapper) => {
    const form = wrapper.querySelector('form');
    if (!form) return;

    const submitBtn = wrapper.querySelector<HTMLButtonElement>('.contact-submit-btn');
    const successEl = wrapper.querySelector('.contact-success');
    const errorEl = wrapper.querySelector('.contact-error-msg');

    // --- Validation helpers ---

    function getErrorEl(field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement): HTMLElement | null {
      const id = field.getAttribute('aria-describedby');
      return id ? wrapper.querySelector(`#${id}`) : null;
    }

    function setValid(field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement): void {
      const tag = field.tagName.toLowerCase();
      if (tag === 'textarea') {
        field.classList.remove('textarea-error');
        field.classList.add('textarea-success');
      } else if (tag === 'select') {
        field.classList.remove('select-error');
        field.classList.add('select-success');
      } else {
        field.classList.remove('input-error');
        field.classList.add('input-success');
      }
      getErrorEl(field)?.classList.add('hidden');
    }

    function setInvalid(field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement): void {
      const tag = field.tagName.toLowerCase();
      if (tag === 'textarea') {
        field.classList.remove('textarea-success');
        field.classList.add('textarea-error');
      } else if (tag === 'select') {
        field.classList.remove('select-success');
        field.classList.add('select-error');
      } else {
        field.classList.remove('input-success');
        field.classList.add('input-error');
      }
      getErrorEl(field)?.classList.remove('hidden');
    }

    function validateField(field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement): boolean {
      if (!field.hasAttribute('required')) return true;
      const valid = field.value.trim().length > 0;
      if (valid) {
        setValid(field);
      } else {
        setInvalid(field);
      }
      return valid;
    }

    // Collect validatable fields (skip hidden/honeypot)
    const validatableFields = Array.from(
      form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
        'input:not([type="hidden"]):not([type="checkbox"]), textarea, select'
      )
    );

    // --- Blur validation ---
    validatableFields.forEach((field) => {
      field.addEventListener('blur', () => validateField(field));
    });

    // --- Form submission ---
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Validate all required fields
      let isValid = true;
      validatableFields.forEach((field) => {
        if (field.hasAttribute('required') && !validateField(field)) {
          isValid = false;
        }
      });

      if (!isValid) return;

      // Loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi en cours…';
      }
      errorEl?.classList.add('hidden');

      // Build FormData (includes `access_key` from hidden input automatically)
      const formData = new FormData(form);

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json() as { success: boolean; message?: string };

        if (data.success) {
          // Hide form, show success
          form.classList.add('hidden');
          successEl?.classList.remove('hidden');
        } else {
          // Re-enable button, show error
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Envoyer ma demande';
          }
          errorEl?.classList.remove('hidden');
        }
      } catch {
        // Network error
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Envoyer ma demande';
        }
        errorEl?.classList.remove('hidden');
      }
    });
  });
</script>
```

**Design decisions:**
- `data-contact-form` on the wrapper `<div>` allows the script to scope all DOM queries to the specific form instance. `querySelectorAll('[data-contact-form]')` supports multiple instances on one page (unlikely but safe).
- `novalidate` on `<form>` disables native browser validation bubbles — our custom validation provides better French UX.
- `min-h-[44px]` on submit button ensures 44px tap target (FR36, architecture rule).
- `form.classList.add('hidden')` on success hides the entire form including all fields and the submit button — clean success state.
- `pb-1` on `<label>` adds breathing room between label and field.
- TypeScript in `<script>` works out of the box in Astro with TypeScript strict mode — all types annotated.
- Empty `catch` block parameter is valid TypeScript 4+ (no variable name needed when the error is not used).

**Why `type="text"` for Date souhaitée:** A calendar picker (`type="date"`) would require a specific date format and return an ISO string — not user-friendly for approximate dates like "juin 2026". `type="text"` with a placeholder gives the visitor freedom to express their preferred timeframe naturally in French.

**Why NOT a redirect on success:** Web3Forms supports `redirect` via a hidden input, but AC-11 requires an **inline** success message without page navigation. Our `fetch()` approach is the correct implementation.

---

### Architecture Compliance

| Rule | Status for Story 4.1 |
|---|---|
| **TypeScript strict** | `interface Props`, typed `HTMLElement` / `HTMLInputElement` queries, typed `data` response. No `any`, no `@ts-ignore`. |
| **Tailwind/daisyUI only** | All classes are Tailwind utilities and daisyUI tokens (`form-control`, `input`, `input-bordered`, `input-error`, `input-success`, `btn`, `btn-primary`, `alert`, `alert-success`, `alert-error`). No `<style>` blocks, no inline CSS except the honeypot `display:none`. |
| **Semantic HTML** | `<label for="">`, `<form>`, `<input>`, `<textarea>`, `<select>`, `<button type="submit">`. No div soup for interactive elements. |
| **Accessibility (FR33)** | Every field has `<label>`, `id`, `aria-describedby` linking to error `<p>`. Error `<p>` has `role="alert"`. Success has `role="status"` + `aria-live="polite"`. Error has `role="alert"` + `aria-live="polite"`. |
| **44px tap targets (FR36)** | Submit button has `min-h-[44px]`. |
| **No client-side JS without justification** | JS is justified: blur validation, async POST, inline success/error — none of these are achievable without client JS. Architecture doc explicitly allows islands for this use case: *"ContactForm → Web3Forms: HTTP POST (fetch)"*. |
| **Content in French** | All visible text, labels, error messages, and placeholder text are in French. |
| **Flat components/** | `ContactForm.astro` at root of `components/`. Total: 13 components — under 15-component threshold. |
| **Honeypot anti-spam (NFR9)** | `botcheck` hidden checkbox per Web3Forms standard. `display:none` + `tabindex="-1"` + `aria-hidden="true"` — invisible to real users and screen readers. |
| **Zero server-side data storage (NFR10)** | Web3Forms forwards to email only — no database, no logs. |
| **Phone/address from business.ts** | No phone or address hardcoded in this component (not needed here — StickyContact handles that). |

---

### Project Structure Notes

**Files to CREATE:**
```
src/components/ContactForm.astro         ← new contact form component (this story)
```

**Files to NOT touch:**
- `src/pages/index.astro` — no changes
- `src/layouts/BaseLayout.astro` — no changes
- `src/data/business.ts` — no changes
- `src/data/navigation.ts` — no changes
- `src/content.config.ts` — no changes
- `src/styles/global.css` — no changes
- `.env.example` — already documents `WEB3FORMS_KEY` (no change needed)
- Any existing service page `.astro` files — NOT touched
- Any existing content `.md` files — NOT touched

**Components state after this story:**
```
src/components/
├── SchemaMarkup.astro      ← exists (unchanged)
├── Navbar.astro            ← exists (unchanged)
├── StickyContact.astro     ← exists (unchanged)
├── Footer.astro            ← exists (unchanged)
├── Hero.astro              ← exists (unchanged)
├── PlanningBlock.astro     ← exists (unchanged)
├── PricingTable.astro      ← exists (unchanged)
├── Testimonial.astro       ← exists (unchanged)
├── ServicePage.astro       ← exists (unchanged)
├── ProfileRouting.astro    ← exists (unchanged)
├── ServiceCard.astro       ← exists (unchanged)
├── NewsCard.astro          ← exists (unchanged)
└── ContactForm.astro       ← CREATE THIS (story 4.1)
```
Total: 13 components — under the 15-component threshold for subfolders.

---

### Previous Story Intelligence (Story 3.3 Learnings)

| Learning | Impact on Story 4.1 |
|---|---|
| **Tailwind v4 CSS-first config** | No `tailwind.config.mjs`. All daisyUI tokens (`form-control`, `input-bordered`, `btn-primary`, `alert-success`, etc.) are available via the `@plugin "daisyui"` directive in `global.css`. Use them directly. |
| **`astro check` AND `npm run build` both required** | Run both in Task 4: `astro check` catches TypeScript/Zod issues, `npm run build` catches Vite bundling issues. |
| **daisyUI CSS warnings are cosmetic** | Known non-blocking warnings during build. Do not investigate unless new warnings appear. |
| **TypeScript in `<script>` tags** | Astro compiles TypeScript in `<script>` blocks via Vite. Full strict mode works. Type assertions (`as`, type annotations) are supported. |
| **`transition-[property]` over `transition-all`** | Code review finding from Story 3.2 (M-1). If adding hover transitions, prefer `motion-safe:transition-[box-shadow,transform]` over `motion-safe:transition-all`. Not applicable to form fields but relevant for the submit button if needed. |
| **Astro deduplicates module scripts** | The `<script>` in `ContactForm.astro` is injected once per page even if multiple `<ContactForm>` instances exist. Use `querySelectorAll('[data-contact-form]')` to handle all instances. |
| **No `ogImage` on BaseLayout** | This story doesn't touch BaseLayout — not relevant. Story 4.2 will create the contact page and may or may not set `ogImage`. |

---

### Git Intelligence (Recent Work)

Most recent commits:
1. `048ae15` — Story 3-2: Service Cards Grid on Homepage (`ServiceCard.astro` + `index.astro`)
2. `f8eac4a` — Story 3-1: Homepage hero with profile routing (`Hero.astro` + `ProfileRouting.astro` + `index.astro`)
3. `a4e6d49` — Story 2-8 (global pricing page — `tarifs.astro`)

**Pattern from recent stories:** Each story creates 1-5 files. Story 4.1 creates exactly 1 file: `ContactForm.astro`. Commit message pattern: `"Story 4-1: Contact Form Component with Web3Forms Integration"`.

---

### What Story 4.1 Does NOT Include

| Excluded | Reason | Handled By |
|---|---|---|
| `/contact` page | Separate story scope | Story 4.2 |
| Embedding ContactForm on service pages | Out of scope for this story | Future stories as needed |
| Rate limiting beyond honeypot | Web3Forms free tier handles this server-side | NFR9 partially covered |
| Email template customization | Web3Forms default template is sufficient for MVP | V2 or manual Web3Forms config |
| Phone validation regex | AC asks for non-empty validation only, not format. Regex validation adds friction without real benefit in French context (many formats: 06 XX, +33 6...) | Acceptable tradeoff |
| `redirect` hidden input | Not needed — AC requires inline success message via fetch() | N/A |

---

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 4.1: Contact Form Component with Web3Forms Integration]
- [Source: _bmad-output/planning-artifacts/epics.md#Epic 4: Contact, Forms & Conversion]
- [Source: _bmad-output/planning-artifacts/architecture.md#Contact & WhatsApp Strategy]
- [Source: _bmad-output/planning-artifacts/architecture.md#External Integration Points — Web3Forms]
- [Source: _bmad-output/planning-artifacts/architecture.md#Enforcement Guidelines]
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation Patterns & Consistency Rules]
- [Source: _bmad-output/planning-artifacts/epics.md#Requirements Inventory — NFR9, NFR10, FR13, FR14, FR33, FR36]
- [Source: _bmad-output/implementation-artifacts/3-3-homepage-news-section-with-freshness-logic.md#Previous Story Intelligence]
- [Source: .env.example — WEB3FORMS_KEY variable]
- [Source: src/components/StickyContact.astro — component pattern reference]

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

None — implementation went smoothly, no issues encountered.

### Completion Notes List

- Created `src/components/ContactForm.astro` with all 4 variants (generic, cours, pension, evenement)
- All static HTML structure, accessibility attributes (aria-describedby, role="alert", role="status", aria-live), and honeypot field implemented in one file
- Client-side blur validation: `validateField()` helper with tag-aware CSS class toggling (input/textarea/select variants)
- Client-side form submission: async fetch to Web3Forms API, loading state, inline success/error handling
- `astro check` passed with 0 errors, 0 warnings (2 pre-existing hints on SchemaMarkup.astro unrelated to this story)
- `npm run build` completed successfully — no regressions on any existing page
- AC-1 through AC-14 all satisfied

**Code review fixes applied (claude-sonnet-4-6):**
- [H-1] Moved `contact-success` and `contact-error-msg` alerts outside `<form>` — fixes AC-11 (success message was invisible inside hidden form)
- [M-1] Added `contact-obligatoire-note` class and hide it in JS on success — "* Obligatoire" no longer persists after submission
- [M-2] Added `uid` (unique per instance via `Math.random()`) appended to all HTML `id` attributes — prevents duplicate IDs when multiple ContactForm instances on same page
- [M-3] Extended `validateField()` to enforce `min` attribute for `type="number"` fields — `novalidate` was bypassing browser constraint, allowing 0 or negative participant counts
- [M-4] Added `invalidFields[0]?.focus()` after failed submit validation — keyboard users now directed to first invalid field

### File List

- src/components/ContactForm.astro (created)
