# CurioSpark Draft Workflow

1. Generate drafts:

```bash
npm run drafts:generate -- 2
```

2. Review drafts in the private dashboard:

```txt
/admin/drafts?token=YOUR_TOKEN
```

3. Publish only the draft you approve:

```bash
npm run drafts:publish -- article-slug
```

4. Deploy after publishing:

```bash
git add .
git commit -m "Publish reviewed article"
git push
```

Keep AdSense review conservative: publish reviewed, sourced, evergreen articles instead of fully automatic public posts.
